const logger = require('../../../lib/logger');
const { getAppData } = require('../../../services/applications.service');
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
const {
	getRepresentationsViewModel,
	getRepresentationViewModel
} = require('./_utils/get-representations-view-model');
const { getRelevantRepresentationsURL } = require('./_utils/get-relevant-representations-url');
const { mapTitles } = require('../../_utils/map-titles');

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

	res.render(representationsView, {
		projectName: applicationData.projectName,
		caseRef: case_ref,
		allowProjectInformation,
		hideAllExaminationDocumentsLink,
		representations: getRepresentationsViewModel(representations, case_ref),
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
		return res.status(404).render('error/not-found');
	}
};
