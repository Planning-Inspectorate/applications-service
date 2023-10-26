const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const examinationRoute = 'examination-of-the-application';

const examinationURL = getProcessGuidePageURL(examinationRoute);

const examinationTitle = 'Examination';

const examinationContent =
	'The examining authority will ask questions about the proposed development. The applicant and anyone who has registered to have their say can get involved and submit comments at each deadline in the timetable. You can also attend hearings that may take place. This stage takes up to 6 months.';

const examinationLinkText = 'What happens at the examination stage';

module.exports = {
	examinationRoute,
	examinationURL,
	examinationTitle,
	examinationContent,
	examinationLinkText
};
