const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { formatDate } = require('../../utils/date-utils');
const { titleCase } = require('../../utils/string-case');
const { searchRepresentations } = require('../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { getRepresentation } = require('../../services/representation.service');
const { featureHideLink } = require('../../config');

const {
	hideProjectInformationLink,
	hideAllExaminationDocumentsLink,
	hideRecommendationAndDecisionLink,
	hideExaminationTimetableLink
} = featureHideLink;

exports.getRepresentations = async (req, res) => {
	const { searchTerm, type } = req.query;
	const applicationResponse = await getAppData(req.params.case_ref);
	const commentsTypeFilterItems = [];

	const params = {
		applicationId: req.params.case_ref,
		page: '1',
		...req.query
	};
	let queryUrl = '';
	if (params.searchTerm) {
		queryUrl = `&searchTerm=${params.searchTerm}`;
	}
	if (params.type) {
		const typeQueryParams = params.type instanceof Array ? [...params.type] : [params.type];
		queryUrl = `${queryUrl}&type=${typeQueryParams.join('&type=')}`;
	}

	if (applicationResponse.resp_code === 200) {
		const representationsResponse = await searchRepresentations(params);
		const respData = representationsResponse.data;
		const { representations, filters } = respData;
		const paginationData = getPaginationData(respData);
		const pageOptions = calculatePageOptions(paginationData);
		const { typeFilters } = filters;

		typeFilters.forEach((typeFilter) => {
			const typeFilterName = titleCase(typeFilter.name);
			commentsTypeFilterItems.push({
				text: `${typeFilterName} (${typeFilter.count})`,
				value: typeFilterName,
				checked: type && type.includes(typeFilterName)
			});
		});

		if (!representations) return res.status(500).render('error/unhandled-exception');

		representations.forEach((repesentation) => {
			repesentation.DateRrepReceived = formatDate(repesentation.DateRrepReceived.split('T')[0]);
			repesentation.RepFrom = titleCase(repesentation.RepFrom);
		});

		res.render(VIEW.PROJECTS.REPRESENTATIONS, {
			projectName: applicationResponse.data.ProjectName,
			caseRef: applicationResponse.data.CaseReference,
			hideProjectInformationLink,
			hideAllExaminationDocumentsLink,
			hideRecommendationAndDecisionLink,
			hideExaminationTimetableLink,
			representations,
			paginationData,
			pageOptions,
			searchTerm,
			queryUrl,
			commentsTypeFilterItems
		});
	}
};

exports.getRepresentation = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	if (applicationResponse.resp_code === 200) {
		let representation = await getRepresentation(req.params.id);

		if (!representation) return res.status(500).render('error/unhandled-exception');

		res.render(VIEW.PROJECTS.REPRESENTATION, {
			projectName: applicationResponse.data.ProjectName,
			caseRef: applicationResponse.data.CaseReference,
			hideProjectInformationLink,
			hideAllExaminationDocumentsLink,
			hideRecommendationAndDecisionLink,
			hideExaminationTimetableLink,
			RepFrom: titleCase(representation.data.RepFrom),
			PersonalName: representation.data.PersonalName,
			RepresentationRedacted: representation.data.RepresentationRedacted,
			DateRrepReceived: representation.data.DateRrepReceived,
			attachments: representation.data.attachments
		});
	}
};
