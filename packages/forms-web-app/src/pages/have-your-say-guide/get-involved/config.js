const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const getInvolvedRoute = 'get-involved-preliminary-meeting';

const getInvolvedURL = getHaveYourSayGuidePageURL(getInvolvedRoute);

const getInvolvedTitle = 'Get involved in the preliminary meeting';

const getInvolvedContent =
	'In the months after the registration period closes, the Examining Authority will hold a preliminary meeting. This meeting is to discuss the main issues the examining authority will be examining, and the timetable for the examination stage.';

const getInvolvedLinkText = 'What you can do at the preliminary meeting.';

module.exports = {
	getInvolvedURL,
	getInvolvedTitle,
	getInvolvedContent,
	getInvolvedLinkText
};
