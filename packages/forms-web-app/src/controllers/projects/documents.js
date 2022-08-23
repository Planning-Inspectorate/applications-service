const { formatDate } = require('../../utils/date-utils');
const { Status: projectStageNames } = require('../../utils/status');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchDocumentsV2 } = require('../../services/document.service');
const { featureHideLink } = require('../../config');

const {
	hideProjectInformationLink,
	hideAllExaminationDocumentsLink,
	hideRecommendationAndDecisionLink,
	hideExaminationTimetableLink
} = featureHideLink;

function renderData(
	req,
	res,
	searchTerm,
	params,
	response,
	projectName,
	stageList = [],
	typeList = [],
	categoryList = []
) {
	const respData = response.data;
	const { documents, filters } = respData;
	const { stageFilters, typeFilters, categoryFilters } = filters;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);

	const modifiedStageFilters = stageFilters.map((stage) => ({
		text: `${projectStageNames[stage.name]} (${stage.count})`,
		value: stage.name,
		checked: stageList.includes(stage.name)
	}));

	const modifiedCategoryFilters = categoryFilters.map((categoryFilter) => ({
		text: categoryFilter.name === "Developer's Application" ?
			`Application Documents (${categoryFilter.count})`:
			categoryFilter.name,
		value: categoryFilter.name,
		checked: categoryList.includes(categoryFilter.name)
	}));

	const modifiedTypeFilters = prepareTypeFilters(typeFilters, typeList);

	// TODO: move this to a function
	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;
	documents.forEach(function (document, index) {
		if (!documentExaminationLibraryIndex) {
			const documentType = typeof document.type === 'string' ? document.type.toLowerCase() : '';
			if (documentType === documentExaminationLibraryId) {
				documentExaminationLibraryIndex = index;
			}
		}

		document.date_published = formatDate(document.date_published);
	}, Object.create(null));

	if (documentExaminationLibraryIndex) {
		const documentElement = documents.splice(documentExaminationLibraryIndex, 1)[0];
		documents.splice(0, 0, documentElement);
	}

	res.render(VIEW.PROJECTS.DOCUMENTS, {
		documents,
		projectName,
		caseRef: params.caseRef,
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink,
		hideExaminationTimetableLink,
		paginationData,
		pageOptions,
		searchTerm: params.searchTerm,
		queryUrl: buildQueryUrl(params),
		modifiedStageFilters,
		modifiedTypeFilters,
		modifiedCategoryFilters
	});
}

exports.getApplicationDocuments = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	if (applicationResponse.resp_code === 200) {
		const projectName = applicationResponse.data.ProjectName;

		const params = {
			caseRef: req.params.case_ref,
			classification: 'application',
			page: '1',
			...req.query
		};

		const response = await searchDocumentsV2(params);

		const { searchTerm, stage, type, category } = req.query;

		renderData(
			req,
			res,
			searchTerm,
			params,
			response,
			projectName,
			stage,
			normaliseQueryParam(type),
			normaliseQueryParam(category)
		);
	}
};

const normaliseQueryParam = (param) => typeof param === "string" ? [param] : param;

const buildQueryUrl = (params) => {
	let queryUrl = '';
	if (params.searchTerm) {
		queryUrl = `&searchTerm=${params.searchTerm}`;
	}
	if (params.stage) {
		const stageQueryParams = params.type instanceof Array ? [...params.stage] : [params.stage];
		queryUrl = `${queryUrl}&stage=${stageQueryParams.join('&stage=')}`;
	}
	if (params.type) {
		const typeQueryParams = params.type instanceof Array ? [...params.type] : [params.type];
		queryUrl = `${queryUrl}&type=${typeQueryParams.join('&type=')}`;
	}
	if (params.category) {
		const categoryQueryParams = params.category instanceof Array ? [...params.category] : [params.category];
		queryUrl = `${queryUrl}&category=${categoryQueryParams.join('&category=')}`;
	}
	return queryUrl;
}

const prepareTypeFilters = (typeFilters, typeList) => {
	const MAX_NUMBER_OF_FILTERS_TO_DISPLAY = 4;

	let filters = [];
	let everythingElseCount = 0;

	for (let i = 0; i < typeFilters.length; i++) {
		let typeFilter = typeFilters[i];

		if (typeFilter.name === "Other Documents" || i > MAX_NUMBER_OF_FILTERS_TO_DISPLAY) {
			everythingElseCount += typeFilter.count;
		} else {
			filters.push({
				text: `${typeFilter.name} (${typeFilter.count})`,
				value: typeFilter.name,
				checked: typeList.includes(typeFilter.name)
			});
		}
	}

	filters.push({
		text: `Everything else (${everythingElseCount})`,
		value: "everything_else",
		checked: typeList.includes("everything_else"),
	});

	return filters;
}