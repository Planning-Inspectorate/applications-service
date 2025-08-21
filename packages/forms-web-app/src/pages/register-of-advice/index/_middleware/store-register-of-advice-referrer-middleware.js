const {
	getRegisterOfAdviceIndexURL
} = require('../../../register-of-advice/index/_utils/get-register-of-advice-index-url');

const storeRegisterOfAdviceReferrerMiddleware = (req, res, next) => {
	const ref = req.get('Referrer');
	const indexPath = getRegisterOfAdviceIndexURL();

	const isFromIndexPage = ref && ref.includes(indexPath) && !ref.includes(`${indexPath}/`);

	const isFromDetailPage = ref && ref.includes(`${indexPath}/`);

	const updateLangQuery = (urlString, newLang) => {
		if (!urlString) return urlString;
		const [base, queryString] = urlString.split('?');
		if (!queryString) return `${base}?lang=${newLang}`;
		const queryParams = queryString.split('&').reduce((acc, pair) => {
			const [key, value] = pair.split('=');
			acc[key] = value;
			return acc;
		}, {});
		console.log('### before', queryParams);
		queryParams.lang = newLang;
		console.log('### after', queryParams);
		const updatedQuery = Object.entries(queryParams)
			.map(([key, val]) => `${key}=${val}`)
			.join('&');
		return `${base}?${updatedQuery}`;
	};

	if (isFromIndexPage) {
		console.log(' Storing back link:', ref);
		req.session.registerOfAdviceBackLink = ref;
		console.log('### Stored to session:', req.session.registerOfAdviceBackLink);
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
