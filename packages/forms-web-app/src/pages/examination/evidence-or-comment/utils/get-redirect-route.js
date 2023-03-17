const {
	routesConfig: {
		examination: {
			pages: { enterComment, evidenceOrComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectRoute = (value) => {
	let redirectUrl;

	switch (value) {
		case evidenceOrComment.options[1].value:
			redirectUrl = enterComment.route;
			break;
		case evidenceOrComment.options[2].value:
			redirectUrl = selectFile.route;
			break;
		case evidenceOrComment.options[3].value:
			redirectUrl = enterComment.route;
			break;
		default:
			throw new Error('Value does not match a required submission type');
	}

	return redirectUrl;
};

module.exports = { getRedirectRoute };
