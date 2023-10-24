const { getProcessGuideSteps } = require('../_utils/get-process-guide-steps');

const addSteps = (req, res, next) => {
	const { path } = req;
	const steps = getProcessGuideSteps(path);

	res.locals.processGuide = {
		...steps
	};

	next();
};

module.exports = { addSteps };
