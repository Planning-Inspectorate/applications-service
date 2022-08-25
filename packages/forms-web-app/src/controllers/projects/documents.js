const { formatDate } = require('../../utils/date-utils');
const { documentProjectStages } = require('../../utils/project-stages');
const { removeFilterTypes } = require('../../utils/remove-filter-types');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchDocumentsV2 } = require('../../services/document.service');
const { featureHideLink } = require('../../config');
const { replaceControllerParamType } = require('../../utils/replace-controller-param-type');
const { queryStringBuilder } = require('../../utils/query-string-builder');

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
	typeList = []
) {
	const baseUrl = `/projects/${params.caseRef}`;
	const pageUrl = `${baseUrl}/application-documents`;
	const queryUrl = queryStringBuilder(params, ['searchTerm', 'stage', 'type'], false);
	const paginationUrl = `${pageUrl}?page=:page${queryUrl}`;

	const respData = response.data;
	const { documents, filters } = respData;
	const { stageFilters, typeFilters } = filters;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const modifiedStageFilters = [];
	const top5TypeFilters = [];
	let documentExaminationLibraryIndex = null;

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
		baseUrl,
		pageUrl,
		caseRef: params.caseRef,
		documents,
		projectName,
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink,
		hideExaminationTimetableLink,
		paginationData,
		paginationUrl,
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
			classification: 'all',
			page: '1',
			...req.query
		};

		const newParamsType = replaceControllerParamType(params?.type, 'other', 'everything_else');

		if (newParamsType) {
			params.type = newParamsType;
		}

		const { searchTerm, stage, type } = req.query;

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
			type
		);
	}
};
