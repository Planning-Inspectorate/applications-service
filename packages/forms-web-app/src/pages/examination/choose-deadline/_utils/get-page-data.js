const { chooseDeadlineId } = require('../config');
const { getOpenTimetablesViewModel } = require('./get-open-timetables-view-model');

const getPageData = (session) => ({
	backLinkUrl: 'your-email-address',
	id: chooseDeadlineId,
	timetables: getOpenTimetablesViewModel(session)
});

module.exports = { getPageData };
