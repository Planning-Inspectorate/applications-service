const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const registeringRoute = 'registering-have-your-say';

const registeringURL = getHaveYourSayGuidePageURL(registeringRoute);

const registeringTitle = 'Registering to have your say about a national infrastructure project';

const registeringContent =
	'To get involved after the application is submitted to the Planning Inspectorate, you must register to have your say at the pre-examination stage. Pre-examination is where we prepare for an examination. We will identify an inspector or a panel of inspectors called the Examining Authority and make a plan for the examination stage. Registration is open for at least 30 days. The pre-examination stage takes about 3 months.';

const registeringLinkText =
	'How to register to have your say about a national infrastructure project.';

module.exports = {
	registeringURL,
	registeringTitle,
	registeringContent,
	registeringLinkText
};
