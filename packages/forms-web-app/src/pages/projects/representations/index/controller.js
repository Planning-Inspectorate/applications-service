const logger = require('../../../../lib/logger');
const { searchRepresentations } = require('../../../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../../../lib/pagination');
const {
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const { getRelevantRepresentationsQuery } = require('./_utils/get-relevant-representations-query');
const { documentsPerPage } = require('../../_utils/pagination/documentsPerPage');
const { buildPaginationQueryString } = require('../../../_utils/build-pagination-query-string');
const { isQuerySearchOrTypePresent } = require('./_utils/is-query-search-or-type-present');
const { getRepresentationsViewModel } = require('./_utils/get-representations-view-model');
const { getRepresentationsURL } = require('../_utils/get-representations-url');
const { getFilters } = require('./_utils/get-filters');
const { hasRepresentationsAvailable } = require('./_utils/has-representations-available');
const { isLangWelsh } = require('../../../_utils/is-lang-welsh');
const { queryStringBuilder } = require('../../../../utils/query-string-builder');

const view = 'projects/representations/index/view.njk';

const getRepresentationsIndexController = async (req, res, next) => {
	try {
		const { i18n, params, query } = req;
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

		const representationsAvailable = hasRepresentationsAvailable(
			applicationData.DateRRepAppearOnWebsite
		);
		const showRepresentations = representations.length > 0 && representationsAvailable;
		const resultsNotFound =
			representations.length === 0 && representationsAvailable && isQuerySearchOrTypePresent(query);
		const hasNoResultsPostDecision =
			representations.length === 0 && applicationData.status.number >= 7;

		const langIsWelsh = isLangWelsh(i18n.language);
		return res.render(view, {
			...getFilters(query, typeFilters, langIsWelsh),
			projectName: applicationData.projectName,
			caseRef: case_ref,
			allowProjectInformation,
			representations: getRepresentationsViewModel(representations, i18n.language, case_ref),
			paginationData,
			pageOptions,
			searchTerm,
			showRepresentations,
			resultsNotFound,
			hasNoResultsPostDecision,
			resultsPerPage: documentsPerPage(query),
			paginationQueryString: buildPaginationQueryString(query),
			querySearchOrTypePresent: isQuerySearchOrTypePresent(query),
			relevantRepresentationsURL: getRepresentationsURL(case_ref),
			langIsWelsh
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postRepresentationsIndexController = async (req, res) => {
	try {
		const {
			body,
			params: { case_ref }
		} = req;

		const queryParamsToKeep = Object.keys(body);
		const queryString = queryStringBuilder(body, queryParamsToKeep);
		const representationsURL = getRepresentationsURL(case_ref);

		return res.redirect(`${representationsURL}${queryString}`);
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = { getRepresentationsIndexController, postRepresentationsIndexController };
