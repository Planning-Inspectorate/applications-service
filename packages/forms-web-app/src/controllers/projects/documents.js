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

	if (params.category) {
		const categoryQueryParams =
			params.category instanceof Array ? [...params.category] : [params.category];
		queryUrl = `${queryUrl}&category=${categoryQueryParams.join('&category=')}`;
	}

	const respData = response.data;
	const { documents, filters } = respData;
	const { stageFilters, typeFilters, categoryFilters } = filters;
	logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const modifiedTypeFilters = [];
	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;
	const numberOfFiltersToDisplay = 5;

	const modifiedStageFilters = stageFilters.map(({ name: stageName, count }) => ({
		text: `${projectStageNames[stageName]} (${count})`,
		value: stageName,
		checked: stageList.includes(stageName)
	}));

	const modifiedCategoryFilters = categoryFilters.map(({ name: categoryName, count }) => ({
		text: `${categoryName} (${count})`,
		value: categoryName,
		checked: categoryList.includes(categoryName)
	}));
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
			modifiedTypeFilters.push({
				text: `${type.name} (${type.count})`,
				value: type.name,
				checked: typeList.includes(type.name)
			});
		}, Object.create(null));

	if (newTypeFilters.length > 4) {
		modifiedTypeFilters.push({
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

		let paramsType = params.type;
		let paramsCategory = params.category;

		const paramsCategoryTypeOf = typeof paramsCategory;
		const applicationDocument = 'Application Document';
		const developersApplication = "Developer's Application";
		const categoryList = [];

		const newParamsType = replaceControllerParamType(paramsType, 'other', 'everything_else');

		if (newParamsType) {
			paramsType = newParamsType;
		}

		if (paramsCategory && Array.isArray(paramsCategory)) {
			const newParamsCategory = [];

			for (const paramCategory of paramsCategory) {
				if (paramCategory === applicationDocument) {
					categoryList.push(developersApplication);
					newParamsCategory.push(developersApplication);
				}

				if (paramCategory !== applicationDocument) {
					newParamsCategory.push(paramCategory);
				}
			}

			paramsCategory = newParamsCategory;
		}

		if (paramsCategory && paramsCategoryTypeOf === 'string') {
			if (paramsCategory !== applicationDocument) {
				paramsCategory = [paramsCategory];
			} else if (paramsCategory === applicationDocument) {
				paramsCategory = [developersApplication];
				categoryList.push(developersApplication);
			} else {
				paramsCategory = [paramsCategory, developersApplication];
			}
		}

		params.type = paramsType ? paramsType : [];

		params.category = paramsCategory ? paramsCategory : [];

		const response = await searchDocumentsV2(params);

		const { searchTerm, stage, type, category } = req.query;

		renderData(req, res, searchTerm, params, response, projectName, stage, type, category);
	}
};
