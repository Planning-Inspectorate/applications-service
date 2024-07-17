const { chooseDeadlineId } = require('../config');
const { getOpenTimetablesViewModel } = require('./get-open-timetables-view-model');

const getPageData = (i18n, session) => ({
	backLinkUrl: 'your-email-address',
	id: chooseDeadlineId,
	timetables: getOpenTimetablesViewModel(i18n, session)
});

module.exports = { getPageData };
