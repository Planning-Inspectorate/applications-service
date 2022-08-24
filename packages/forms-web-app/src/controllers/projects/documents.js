const { formatDate } = require('../../utils/date-utils');
const { documentProjectStages } = require('../../utils/project-stages');
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

const documentExaminationLibraryId = 'examination library';

function renderData(
	req,
	res,
	searchTerm,
	params,
	response,
	examinationLibraryResponse,
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
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const modifiedTypeFilters = [];
	const modifiedStageFilters = [];
	const documentExaminationLibraryId = 'examination library';
	let documentExaminationLibraryIndex = null;
	const numberOfFiltersToDisplay = 5;

	const modifiedCategoryFilters = categoryFilters.map(({ name: categoryName, count }) => ({
		text: `${categoryName} (${count})`,
		value: categoryName,
		checked: categoryList.includes(categoryName)
	}));

	if (documents.length && examinationLibraryResponse) {
		for (let i = 0; i < documents.length; i++) {
			const document = documents[i];
			const documentType = typeof document.type === 'string' ? document.type.toLowerCase() : '';

			if (documentType === documentExaminationLibraryId) {
				documentExaminationLibraryIndex = i;
				break;
			}
		}

		if (documentExaminationLibraryIndex !== null) {
			const documentElement = documents.splice(documentExaminationLibraryIndex, 1)[0];
			documents.splice(0, 0, documentElement);
		} else {
			const examinationLibraryDocuments = examinationLibraryResponse?.data?.documents;

			if (
				examinationLibraryDocuments &&
				Array.isArray(examinationLibraryDocuments) &&
				examinationLibraryDocuments.length
			) {
				const findExaminationLibraryDocumentType = examinationLibraryDocuments.find(
					(examinationLibraryDocument) => {
						const examinationLibraryDocumentType =
							typeof examinationLibraryDocument.type === 'string'
								? examinationLibraryDocument.type.toLowerCase()
								: '';
						return examinationLibraryDocumentType === documentExaminationLibraryId;
					}
				);

				if (findExaminationLibraryDocumentType) {
					documents.unshift(findExaminationLibraryDocumentType);
				}
			}
		}
	}

	if (documents.length) {
		documents.forEach(
			(document) => (document.date_published = formatDate(document.date_published))
		);
	}

	const getProjectStageCount = (projectStageValue) => {
		const projectStageItem = stageFilters.find((stageFilter) => {
			return `${stageFilter.name}` === `${projectStageValue}`;
		});

		return projectStageItem?.count || 0;
	};

	Object.keys(documentProjectStages).forEach((projectStage) => {
		const projectStageName = documentProjectStages[projectStage].name;
		const projectStageValue = documentProjectStages[projectStage].value;
		const projectStageCount = getProjectStageCount(projectStageValue);
		const projectStageChecked = stageList.includes(projectStageValue);

		modifiedStageFilters.push({
			checked: projectStageChecked,
			text: `${projectStageName} (${projectStageCount})`,
			value: projectStageValue
		});
	});

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
			classification: 'all',
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

		const { searchTerm, stage, type, category } = req.query;

		let examinationLibraryResponse = null;

		if (params.page === '1' && !searchTerm) {
			examinationLibraryResponse = await searchDocumentsV2({
				...params,
				searchTerm: documentExaminationLibraryId
			});
		}

		const response = await searchDocumentsV2(params);

		renderData(
			req,
			res,
			searchTerm,
			params,
			response,
			examinationLibraryResponse,
			projectName,
			stage,
			type,
			category
		);
	}
};
