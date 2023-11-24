const { isQueryModeEdit } = require('../../../../../controllers/utils/is-query-mode-edit');
const { getSiteBackLinkURL } = require('../../../../_utils/get-site-back-link-url');
const { getRegisterIndexURL } = require('../../index/_utils/get-register-index-url');

const getBackLinkURL = (url, caseRef, query) =>
	isQueryModeEdit(query) ? getSiteBackLinkURL(url) : getRegisterIndexURL(caseRef);

module.exports = { getBackLinkURL };
