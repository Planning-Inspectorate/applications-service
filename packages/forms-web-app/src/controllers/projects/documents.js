const logger = require('../../lib/logger');
const { formatDate } = require('../../utils/date-utils');
const { Status: projectStageNames } = require('../../utils/status');
const { removeFilterTypes } = require('../../utils/remove-filter-types');
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
	const respData = response.data;
	const { documents, filters } = respData;
	const { stageFilters, typeFilters, categoryFilters } = filters;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;

	const modifiedStageFilters = stageFilters.map((stage) => {
		return {
			text: `${projectStageNames[stage.name]} (${stage.count})`,
			value: stage.name,
			checked: stageList.includes(stage.name)
		};
	});

	const modifiedCategoryFilters = categoryFilters.map((categoryFilter) => {
		let text;
		if (categoryFilter.name === "Developer's Application") {
			text = `Application Documents (${categoryFilter.count})`;
		} else {
			text = `${categoryFilter.name} (${categoryFilter.count})`
		}
		return {
			text: text,
			value: categoryFilter.name,
			checked: categoryList.includes(categoryFilter.name)
		}
	});

	console.log("categoryFilters", categoryFilters);
	console.log("categoryList", categoryList);
	console.log("modifiedCategoryFilters", modifiedCategoryFilters);

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

	const modifiedTypeFilters = typeFilters.map((typeFilter) => {
		return {
			text: `${typeFilter.name} (${typeFilter.count})`,
			value: typeFilter.name,
			checked: typeList.includes(typeFilter.name)
		};
	});

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
		queryUrl,
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
