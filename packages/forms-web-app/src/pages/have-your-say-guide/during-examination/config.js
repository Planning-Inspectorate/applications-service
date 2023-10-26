const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const duringExaminationRoute = 'have-your-say-examination';

const duringExaminationURL = getHaveYourSayGuidePageURL(duringExaminationRoute);

const duringExaminationTitle = 'Have your say during the examination of the application';

const duringExaminationContent =
	'The examination stage is where the examining authority asks questions, and the applicant and anyone who has registered to have their say may get involved and comment on the proposed development at the deadlines in the examination timetable. You can also attend any hearings that may take place during this stage. The examination takes up to six months.';

const duringExaminationLinkText = 'Submitting comments during the examination stage';

module.exports = {
	duringExaminationURL,
	duringExaminationTitle,
	duringExaminationContent,
	duringExaminationLinkText
};
