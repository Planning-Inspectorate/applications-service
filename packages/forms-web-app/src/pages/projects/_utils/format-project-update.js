const { formatDate } = require('../../../utils/date-utils');
const { isLangWelsh } = require('../../_utils/is-lang-welsh');

const formatProjectUpdate = (projectUpdate, lang = 'en') => ({
	content: isLangWelsh(lang)
		? projectUpdate.updateContentWelsh || projectUpdate.updateContentEnglish
		: projectUpdate.updateContentEnglish,
	date: formatDate(projectUpdate.updateDate, lang)
});

module.exports = { formatProjectUpdate };
