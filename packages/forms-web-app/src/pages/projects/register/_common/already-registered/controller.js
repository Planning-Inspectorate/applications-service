const { getKeyFromUrl } = require('../../../../../controllers/register/common/get-key-from-url');
const { getProjectsIndexURL } = require('../../../index/_utils/get-projects-index-url');
const logger = require('../../../../../lib/logger');

const journeyKey = 'registration';
const view = 'projects/_components/generic-journey-complete-template.njk';

const getRegisterAlreadyRegisteredController = (req, res) => {
	try {
		const { params, originalUrl } = req;
		const { case_ref: caseRef } = params;
		const key = getKeyFromUrl(originalUrl);

		return res.render(view, {
			key,
			projectsIndexURL: getProjectsIndexURL(caseRef),
			journey: journeyKey,
			backLinkUrl: null
		});
	} catch (e) {
		logger.error(e);
		throw e;
	}
};

module.exports = { getRegisterAlreadyRegisteredController };
