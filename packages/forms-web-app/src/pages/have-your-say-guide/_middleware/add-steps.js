const { getHaveYourSayGuideSteps } = require('../_utils/get-have-your-say-guide-steps');

const addSteps = (req, res, next) => {
	const { path } = req;
	const steps = getHaveYourSayGuideSteps(path);

	res.locals.haveYourSayGuide = {
		...steps
	};

	next();
};

module.exports = { addSteps };
