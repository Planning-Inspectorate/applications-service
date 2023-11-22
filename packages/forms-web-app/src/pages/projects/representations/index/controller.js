const logger = require('../../../../lib/logger');
const { searchRepresentations } = require('../../../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../../../lib/pagination');
const {
	featureHideLink: { hideAllExaminationDocumentsLink },
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const { isDateAfterTodaysDate } = require('./_utils/is-date-after-todays-date');
const { getRelevantRepresentationsQuery } = require('./_utils/get-relevant-representations-query');
const { documentsPerPage } = require('../../_utils/pagination/documentsPerPage');
const { buildPaginationQueryString } = require('../../../_utils/build-pagination-query-string');
const { isQuerySearchOrTypePresent } = require('./_utils/is-query-search-or-type-present');
const { getRepresentationsViewModel } = require('./_utils/get-representations-view-model');
const { getRepresentationsURL } = require('../_utils/get-representations-url');
const { getFilters } = require('./_utils/get-filters');

const view = 'projects/representations/index/view.njk';

const getRepresentationsIndexController = async (req, res, next) => {
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

		return res.render(view, {
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
			relevantRepresentationsURL: getRepresentationsURL(case_ref)
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getRepresentationsIndexController };
