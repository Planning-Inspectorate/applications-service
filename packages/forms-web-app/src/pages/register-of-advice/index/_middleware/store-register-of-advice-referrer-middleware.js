const {
	getRegisterOfAdviceIndexURL
} = require('../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
const { updateLangQuery } = require('../_utils/update-lang-query');

const storeRegisterOfAdviceReferrerMiddleware = (req, res, next) => {
	const ref = req.get('Referrer');
	const indexPath = getRegisterOfAdviceIndexURL();

	const isFromIndexPage = ref && ref.includes(indexPath) && !ref.includes(`${indexPath}/`);
	const isFromDetailPage = ref && ref.includes(`${indexPath}/`);

	if (isFromIndexPage) {
		req.session.registerOfAdviceBackLink = ref;
	}

	if (isFromDetailPage) {
		req.session.registerOfAdviceBackLink = updateLangQuery(
			req.session.registerOfAdviceBackLink,
			req.query.lang
		);
	}
	next();
};
module.exports = { storeRegisterOfAdviceReferrerMiddleware };
