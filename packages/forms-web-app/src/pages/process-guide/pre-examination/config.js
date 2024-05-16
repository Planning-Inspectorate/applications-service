const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const preExaminationRoute = 'pre-examination';

const preExaminationURL = getProcessGuidePageURL(preExaminationRoute);

const preExaminationI18nNamespace = 'preExamination';

module.exports = {
	preExaminationRoute,
	preExaminationURL,
	preExaminationI18nNamespace
};
