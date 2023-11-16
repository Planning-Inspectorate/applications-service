const { formatDate } = require('../../../utils/date-utils');

const formatProjectUpdate = (projectUpdate) => ({
	content: projectUpdate.updateContentEnglish,
	date: formatDate(projectUpdate.updateDate)
});

module.exports = { formatProjectUpdate };
