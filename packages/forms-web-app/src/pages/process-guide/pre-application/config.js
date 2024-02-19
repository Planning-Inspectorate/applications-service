const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const preApplicationRoute = 'pre-application';

const preApplicationURL = getProcessGuidePageURL(preApplicationRoute);

const preApplicationTitle = 'Pre-application';

const preApplicationContent = [
	'This is where the applicant starts to create their application. The applicant is required to consult with people and organisations in the area. They must also create detailed documents about the impact the project could have on the environment.',
	'It is important to get involved at this stage to influence the application before the applicant sends it to the Planning Inspectorate.'
];

const preApplicationLinkText =
	'Find out what you can do at this stage and check our detailed guides.';

module.exports = {
	preApplicationRoute,
	preApplicationURL,
	preApplicationTitle,
	preApplicationContent,
	preApplicationLinkText
};
