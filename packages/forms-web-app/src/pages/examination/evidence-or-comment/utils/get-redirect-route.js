const { evidenceOrCommentValues } = require('../config');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectRoute = (value) => {
	let redirectUrl;

	switch (value) {
		case evidenceOrCommentValues[1]:
			redirectUrl = enterComment.route;
			break;
		case evidenceOrCommentValues[2]:
			redirectUrl = selectFile.route;
			break;
		case evidenceOrCommentValues[3]:
			redirectUrl = enterComment.route;
			break;
		default:
			throw new Error('Value does not match a required submission type');
	}

	return redirectUrl;
};

module.exports = { getRedirectRoute };
