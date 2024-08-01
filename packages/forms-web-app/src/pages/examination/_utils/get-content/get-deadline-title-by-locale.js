const { getContentByLocale } = require('../../../_utils/get-content-by-locale');
const { getExaminationSession } = require('../../_session/examination-session');

const getDeadlineTitleByLocale = (i18n, session) => {
	const examinationSession = getExaminationSession(session);

	const { title, titleWelsh } = examinationSession;

	return getContentByLocale(i18n, title, titleWelsh);
};

module.exports = { getDeadlineTitleByLocale };
