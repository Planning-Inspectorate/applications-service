const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const preExaminationRoute = 'pre-examination';

const preExaminationURL = getProcessGuidePageURL(preExaminationRoute);

const preExaminationTitle = 'Pre-examination';

const preExaminationContent = [
	'The Examining Authority is appointed and is made up of one or more inspectors. Anyone who wants to have their say needs to register at this stage.',
	'The applicant must publish that the application has been accepted by us. They include when and how parties can register to get involved. The time period for registering is set by the applicant but must be no less than 28 days.',
	'The pre-examination stage usually takes about 3 months.'
];

const preExaminationLinkText = 'What happens during the pre-examination stage.';

module.exports = {
	preExaminationRoute,
	preExaminationURL,
	preExaminationTitle,
	preExaminationContent,
	preExaminationLinkText
};
