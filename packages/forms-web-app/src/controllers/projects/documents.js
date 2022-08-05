const logger = require('../../lib/logger');
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

	stageFilters.forEach(function (stage) {
		modifiedStageFilters.push({
			text: `${projectStageNames[stage.name]} (${stage.count})`,
			value: stage.name,
			checked: stageList.includes(stage.name)
		});
	}, Object.create(null));

	documents.forEach(function (document) {
		document.date_published = formatDate(document.date_published);
	}, Object.create(null));

	let otherTypeFiltersCount = 0;

	const newTypeFilters = typeFilters.filter((t) => {
		if (/other documents/i.test(t.name)) {
			otherTypeFiltersCount += t.count;
		}

		return t.name !== 'Other Documents';
	});

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

		if (typeof params?.type === 'string' && params?.type === 'Other Documents') {
			params.type = 'everything_else';
		}

		if (Array.isArray(params?.type) && params?.type.includes('Other Documents')) {
			const removeOtherDocuments = params?.type.filter((t) => t !== 'Other Documents');

			if (params.type.includes('everything_else')) {
				params.type = removeOtherDocuments;
			}

			removeOtherDocuments.push('everything_else');

			params.type = removeOtherDocuments;
		}

		const { searchTerm, stage, type } = req.query;

		const response = await searchDocumentsV2(params);

		renderData(req, res, searchTerm, params, response, projectName, stage, type);
	}
};
