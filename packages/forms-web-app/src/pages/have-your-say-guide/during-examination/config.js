const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const duringExaminationRoute = 'have-your-say-examination';

const duringExaminationURL = getHaveYourSayGuidePageURL(duringExaminationRoute);

const duringExaminationTitle = 'Have your say during the examination of the application';

const duringExaminationContent =
	'At this stage the Examining Authority asks questions about the proposed development. The applicant and anyone who has registered to have their say can make comments by the deadlines in the examination timetable. Anyone can attend hearings that may take place during this stage. The examination can take up to 6 months.';

const duringExaminationLinkText = 'Submitting comments during the examination stage.';

module.exports = {
	duringExaminationURL,
	duringExaminationTitle,
	duringExaminationContent,
	duringExaminationLinkText
};
