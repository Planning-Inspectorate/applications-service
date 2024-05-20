const { getHaveYourSayGuideSteps } = require('../_utils/get-have-your-say-guide-steps');

const addHaveYourSayGuideStepsMiddleware = (req, res, next) => {
	const { i18n, path } = req;

	res.locals.haveYourSayGuide = {
		...getHaveYourSayGuideSteps(i18n, path)
	};

	next();
};

module.exports = { addHaveYourSayGuideStepsMiddleware };
