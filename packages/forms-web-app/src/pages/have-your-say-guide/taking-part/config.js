const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const takingPartRoute = 'taking-part-pre-application';

const takingPartURL = getHaveYourSayGuidePageURL(takingPartRoute);

const takingPartTitle = 'Taking part at the pre-application stage';

const takingPartContent =
	'Pre-application is the first stage of the process. This is where the applicant must consult with people and organisations. The applicant must provide information about how you can submit your comments to them. It is important to get involved at this stage as you can influence the application before the applicant sends it to the Planning Inspectorate.';

const takingPartLinkText =
	'Taking part before the application is submitted to the Planning Inspectorate.';

module.exports = {
	takingPartURL,
	takingPartTitle,
	takingPartContent,
	takingPartLinkText
};
