const { getExaminationSession } = require('../../_session/examination-session');
const { formatDate } = require('../../../../utils/date-utils');
const {
	removeTimetableItemFormatting
} = require('../../../../utils/timetables/format-timetable-items');
const {
	getOpenEventDeadlineTimetables
} = require('../../../../utils/timetables/get-timetables-state');
const { getContentByLocale } = require('../../../_utils/get-content-by-locale');

const getTitle = (i18n, title, dateOfEvent) =>
	i18n.t('examination.chooseDeadline.deadlineTitle', {
		title,
		date: formatDate(dateOfEvent, i18n.language)
	});

const getTimetableViewModel = (
	i18n,
	session,
	{ dateOfEvent, description, descriptionWelsh, title, titleWelsh, uniqueId }
) => {
	const titleByLocale = getContentByLocale(i18n, title, titleWelsh);
	const descriptionByLocale = getContentByLocale(i18n, description, descriptionWelsh);

	return {
		checked: getExaminationSession(session).examinationTimetableId === uniqueId,
		items: removeTimetableItemFormatting(descriptionByLocale),
		title: getTitle(i18n, titleByLocale, dateOfEvent),
		value: uniqueId
	};
};

const getOpenTimetablesViewModel = (i18n, session) =>
	getOpenEventDeadlineTimetables(getExaminationSession(session).timetables).map((timetable) =>
		getTimetableViewModel(i18n, session, timetable)
	);

module.exports = { getOpenTimetablesViewModel };
