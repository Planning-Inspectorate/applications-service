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
	logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const modifiedStageFilters = [];
	const modifiedCategoryFilters = [];
	const top6TypeFilters = [];
	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;
	const numberOfFiltersToDisplay = 5;

	stageFilters.forEach(function (stage) {
		modifiedStageFilters.push({
			text: `${projectStageNames[stage.name]} (${stage.count})`,
			value: stage.name,
			checked: stageList.includes(stage.name)
		});
	}, Object.create(null));

	categoryFilters.forEach(({ category: categoryName, count }) => {
		modifiedCategoryFilters.push({
			text: `${categoryName} (${count})`,
			value: categoryName,
			checked: categoryList.includes(categoryName)
		});
	}, Object.create(null));

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

	let otherTypeFiltersCount = 0;

	const { result: newTypeFilters, otherTypeFiltersCount: removedTypesCount } = removeFilterTypes(
		typeFilters,
		'other'
	);

	otherTypeFiltersCount += removedTypesCount;

	newTypeFilters
		.slice(-(newTypeFilters.length - numberOfFiltersToDisplay))
		.forEach(function (type) {
			otherTypeFiltersCount += type.count;
		}, Object.create(null));

	newTypeFilters
		.slice(0, numberOfFiltersToDisplay)
		.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		})
		.forEach(function (type) {
			top6TypeFilters.push({
				text: `${type.name} (${type.count})`,
				value: type.name,
				checked: typeList.includes(type.name)
			});
		}, Object.create(null));

	if (newTypeFilters.length > 4) {
		top6TypeFilters.push({
			text: `Everything else (${otherTypeFiltersCount})`,
			value: 'everything_else',
			checked: typeList.includes('everything_else')
		});
	}

	top6TypeFilters.unshift(modifiedCategoryFilters[0]);

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
		top6TypeFilters
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

		let paramsType = params.type;

		const paramsTypeOf = typeof paramsType;
		const applicationDocument = 'Application Document';
		const developersApplication = "Developer's Application";
		const categoryList = [];

		if (paramsType && Array.isArray(paramsType)) {
			const newParamsType = [];

			for (const paramType of paramsType) {
				if (paramType === applicationDocument) {
					categoryList.push(developersApplication);
				} else {
					newParamsType.push(paramType);
				}
			}

			paramsType = newParamsType;

			paramsType.push(developersApplication);
		}

		if (paramsType && paramsTypeOf === 'string') {
			if (paramsType === applicationDocument) {
				paramsType = [developersApplication];
				categoryList.push(developersApplication);
			} else {
				paramsType = [paramsType, developersApplication];
			}
		}

		if (!paramsType) {
			paramsType = [developersApplication];
		}

		const newParamsType = replaceControllerParamType(paramsType, 'other', 'everything_else');

		if (newParamsType) {
			paramsType = newParamsType;
		}

		params.type = paramsType;

		const response = await searchDocumentsV2(params);

		const { searchTerm, stage, type } = req.query;

		const typeList = () => {
			if (!type) return [];

			const typeOfType = typeof type;

			if (Array.isArray(type)) {
				return type.filter((t) => t !== applicationDocument);
			}

			if (typeOfType === 'string') {
				if (type !== applicationDocument) {
					return [type];
				} else {
					return [];
				}
			}
		};

		renderData(
			req,
			res,
			searchTerm,
			params,
			response,
			projectName,
			stage,
			typeList(),
			categoryList
		);
	}
};
