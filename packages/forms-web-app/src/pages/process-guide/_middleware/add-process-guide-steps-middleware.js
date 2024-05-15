const { getProcessGuideSteps } = require('../_utils/get-process-guide-steps');

const addProcessGuideStepsMiddleware = (req, res, next) => {
	const { i18n, path } = req;

	res.locals.processGuide = {
		...getProcessGuideSteps(i18n, path)
	};

	next();
};

module.exports = { addProcessGuideStepsMiddleware };
