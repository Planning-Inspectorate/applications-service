const logger = require('../../lib/logger');
const { formatDate } = require('../../utils/date-utils');
const { Status: projectStageNames } = require('../../utils/status');
const { removeFilterTypes } = require('../../utils/remove-filter-types');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchDocumentsV2 } = require('../../services/document.service');
const { featureHideLink } = require('../../config');
const { replaceControllerParamType } = require('../../utils/replace-controller-param-type');

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
	typeList = []
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
	const { stageFilters, typeFilters } = filters;
	logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const modifiedStageFilters = [];
	const top5TypeFilters = [];
	const documentExaminationLibraryId = 'Examination Library';
	let documentExaminationLibraryIndex = null;

	stageFilters.forEach(function (stage) {
		modifiedStageFilters.push({
			text: `${projectStageNames[stage.name]} (${stage.count})`,
			value: stage.name,
			checked: stageList.includes(stage.name)
		});
	}, Object.create(null));

	documents.forEach(function (document, index) {
		if (!documentExaminationLibraryIndex && document.type === documentExaminationLibraryId) {
			documentExaminationLibraryIndex = index;
		}

		document.date_published = formatDate(document.date_published);
	}, Object.create(null));

	if (documentExaminationLibraryIndex) {
		const documentElement = documents.splice(documentExaminationLibraryIndex, 1)[0];
		documents.splice(0, 0, documentElement);
	}

	let otherTypeFiltersCount = 0;

	const { result: newTypeFilters, otherTypeFiltersCount: removedTypesCount } = removeFilterTypes(
		typeFilters,
		'other'
	);

	otherTypeFiltersCount += removedTypesCount;

	newTypeFilters.slice(-(newTypeFilters.length - 4)).forEach(function (type) {
		otherTypeFiltersCount += type.count;
	}, Object.create(null));

	newTypeFilters
		.slice(0, 4)
		.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		})
		.forEach(function (type) {
			top5TypeFilters.push({
				text: `${type.name} (${type.count})`,
				value: type.name,
				checked: typeList.includes(type.name)
			});
		}, Object.create(null));

	if (newTypeFilters.length > 4) {
		top5TypeFilters.push({
			text: `Everything else (${otherTypeFiltersCount})`,
			value: 'everything_else',
			checked: typeList.includes('everything_else')
		});
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
		queryUrl,
		modifiedStageFilters,
		top5TypeFilters
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

		const newParamsType = replaceControllerParamType(params?.type, 'other', 'everything_else');

		if (newParamsType) {
			params.type = newParamsType;
		}

		const { searchTerm, stage, type } = req.query;

		const response = await searchDocumentsV2(params);

		renderData(req, res, searchTerm, params, response, projectName, stage, type);
	}
};
