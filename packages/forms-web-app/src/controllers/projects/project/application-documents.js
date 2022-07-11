const logger = require('../../../lib/logger');
const { status: projectStageNames } = require('../../../utils/status');
const { getPaginationData, calculatePageOptions } = require('../../../lib/pagination');
const { VIEW } = require('../../../lib/views');
const { getAppData } = require('../../../services/application.service');
const { searchDocumentsV2 } = require('../../../services/document.service');

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

	let otherTypeFiltersCount = 0;
	typeFilters.slice(-(typeFilters.length - 5)).forEach(function (type) {
		otherTypeFiltersCount += type.count;
	}, Object.create(null));

	typeFilters
		.slice(0, 5)
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
	if (typeFilters.length > 5) {
		top5TypeFilters.push({
			text: `Everything else (${otherTypeFiltersCount})`,
			value: 'everything_else',
			checked: typeList.includes('everything_else')
		});
	}
	res.render(VIEW.PROJECTS.PROJECT.APPLICATION_DOCUMENTS, {
		documents,
		projectName,
		caseRef: params.caseRef,
		paginationData,
		pageOptions,
		searchTerm: params.searchTerm,
		queryUrl,
		modifiedStageFilters,
		top5TypeFilters
	});
}

const getProjectApplicationDocuments = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	if (applicationResponse.resp_code === 200) {
		const projectName = applicationResponse.data.ProjectName;
		const params = {
			caseRef: req.params.case_ref,
			classification: 'application',
			page: '1',
			...req.query
		};
		const { searchTerm, stage, type } = req.query;
		const response = await searchDocumentsV2(params);

		renderData(req, res, searchTerm, params, response, projectName, stage, type);
	}
};

module.exports = {
	getProjectApplicationDocuments
};
