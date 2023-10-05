const { getAppData } = require('../../../services/applications.service');
const { formatDate } = require('../../../utils/date-utils');
const { titleCase } = require('../../../utils/string-case');
const { searchRepresentations } = require('../../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../../lib/pagination');
const { getRepresentation } = require('../../../services/representation.service');
const {
	featureHideLink: { hideAllExaminationDocumentsLink },
	featureFlag: { allowProjectInformation }
} = require('../../../config');
const { isDateAfterTodaysDate } = require('./_utils/is-date-after-todays-date');
const { getRelevantRepresentationsQuery } = require('./_utils/get-relevant-representations-query');
const { documentsPerPage } = require('../utils/pagination/documentsPerPage');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { isQuerySearchOrTypePresent } = require('./_utils/is-query-search-or-type-present');

const representationsView = 'projects/relevant-representations/representations.njk';
const representationView = 'projects/relevant-representations/representation.njk';

exports.getRepresentations = async (req, res) => {
	const { params, query } = req;
	const { case_ref } = params;
	const { searchTerm, type } = query;
	const { locals } = res;
	const { applicationData } = locals;

	const representationsResponse = await searchRepresentations(
		getRelevantRepresentationsQuery(params, query)
	);

	if (representationsResponse.resp_code === 404) {
		return res.status(404).render('error/not-found');
	}

	const respData = representationsResponse.data;
	const { representations, filters } = respData;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const { typeFilters } = filters;

	const commentsTypeFilterItems = [];

	typeFilters.forEach((typeFilter) => {
		const typeFilterName = titleCase(typeFilter.name);
		commentsTypeFilterItems.push({
			text: `${typeFilterName} (${typeFilter.count})`,
			value: typeFilterName,
			checked: type && type.includes(typeFilterName)
		});
	});

	representations.forEach((repesentation) => {
		repesentation.DateRrepReceived = formatDate(repesentation.DateRrepReceived.split('T')[0]);
		repesentation.RepFrom = titleCase(repesentation.RepFrom);
	});

	res.render(representationsView, {
		projectName: applicationData.projectName,
		caseRef: case_ref,
		allowProjectInformation,
		hideAllExaminationDocumentsLink,
		representations,
		paginationData,
		pageOptions,
		searchTerm,
		commentsTypeFilterItems,
		showReps: isDateAfterTodaysDate(applicationData.DateRRepAppearOnWebsite),
		resultsPerPage: documentsPerPage(query),
		paginationQueryString: buildPaginationQueryString(query),
		querySearchOrTypePresent: isQuerySearchOrTypePresent(query)
	});
};

exports.getRepresentation = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	const representationResponse = await getRepresentation(req.params.id);

	if (applicationResponse.resp_code === 404 || representationResponse.resp_code === 404) {
		return res.status(404).render('error/not-found');
	}

	res.render(representationView, {
		backLinkUrl: req.get('Referrer'),
		projectName: applicationResponse.data.ProjectName,
		caseRef: applicationResponse.data.CaseReference,
		allowProjectInformation,
		hideAllExaminationDocumentsLink,
		RepFrom: titleCase(representationResponse.data.RepFrom),
		PersonalName: representationResponse.data.PersonalName,
		RepresentationRedacted: representationResponse.data.RepresentationRedacted,
		DateRrepReceived: representationResponse.data.DateRrepReceived,
		attachments: representationResponse.data.attachments
	});
};
