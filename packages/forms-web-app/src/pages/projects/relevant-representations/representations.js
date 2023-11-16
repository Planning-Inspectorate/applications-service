const logger = require('../../../lib/logger');
const { getAppData } = require('../../../services/applications.service');
const { searchRepresentations } = require('../../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../../lib/pagination');
const { getRepresentation } = require('../../../services/representation.service');
const {
	featureHideLink: { hideAllExaminationDocumentsLink },
	featureFlag: { allowProjectInformation }
} = require('../../../config');
const { isDateAfterTodaysDate } = require('./_utils/is-date-after-todays-date');
const { getRelevantRepresentationsQuery } = require('./_utils/get-relevant-representations-query');
const { documentsPerPage } = require('../_utils/pagination/documentsPerPage');
const { buildPaginationQueryString } = require('../../_utils/build-pagination-query-string');
const { isQuerySearchOrTypePresent } = require('./_utils/is-query-search-or-type-present');
const {
	getRepresentationsViewModel,
	getRepresentationViewModel
} = require('./_utils/get-representations-view-model');
const { getRelevantRepresentationsURL } = require('./_utils/get-relevant-representations-url');
const { mapTitles } = require('../../_utils/map-titles');
const { getFilters } = require('./_utils/get-filters');

const representationsView = 'projects/relevant-representations/representations.njk';
const representationView = 'projects/relevant-representations/representation.njk';

exports.getRepresentations = async (req, res) => {
	try {
		const { params, query } = req;
		const { case_ref } = params;
		const { searchTerm } = query;
		const { locals } = res;
		const { applicationData } = locals;

		const representationsResponse = await searchRepresentations(
			getRelevantRepresentationsQuery(params, query)
		);

		const respData = representationsResponse.data;
		const { representations, filters } = respData;
		const { typeFilters } = filters;

		const paginationData = getPaginationData(respData);
		const pageOptions = calculatePageOptions(paginationData);

		res.render(representationsView, {
			...getFilters(query, typeFilters),
			projectName: applicationData.projectName,
			caseRef: case_ref,
			allowProjectInformation,
			hideAllExaminationDocumentsLink,
			representations: getRepresentationsViewModel(representations, case_ref),
			paginationData,
			pageOptions,
			searchTerm,
			showReps: isDateAfterTodaysDate(applicationData.DateRRepAppearOnWebsite),
			resultsPerPage: documentsPerPage(query),
			paginationQueryString: buildPaginationQueryString(query),
			querySearchOrTypePresent: isQuerySearchOrTypePresent(query),
			relevantRepresentationsURL: getRelevantRepresentationsURL(case_ref)
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

exports.getRepresentation = async (req, res) => {
	try {
		const { params } = req;
		const { case_ref, id } = params;

		const { data: applicationData } = await getAppData(case_ref);
		const { ProjectName } = applicationData;

		const { data: representation } = await getRepresentation(id);

		const pageHeading = `Representation by ${representation.PersonalName}`;

		return res.render(representationView, {
			...mapTitles(pageHeading, `Relevant Representations | ${pageHeading}`),
			representation: getRepresentationViewModel(representation),
			backToListUrl: getRelevantRepresentationsURL(case_ref),
			projectName: ProjectName,
			allowProjectInformation,
			hideAllExaminationDocumentsLink
		});
	} catch (error) {
		logger.error(error);
		return res.status(404).render('error/unhandled-exception');
	}
};
