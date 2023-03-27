const { server } = require('../../../../config');
const getBackLink = (caseRef, url) => (url && url.includes(server.host) ? url : '');

module.exports = {
	getBackLink
};
