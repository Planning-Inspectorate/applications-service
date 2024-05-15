const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const examinationRoute = 'examination-of-the-application';

const examinationURL = getProcessGuidePageURL(examinationRoute);

const examinationI18nNamespace = 'examination';

module.exports = {
	examinationRoute,
	examinationURL,
	examinationI18nNamespace
};
