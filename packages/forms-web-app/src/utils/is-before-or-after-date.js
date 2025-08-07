const { formatDate } = require('./date-utils');
const moment = require('moment');

const isBeforeNowUTC = (date) => {
	if (!date || typeof date !== 'string') return;

	return new Date() < new Date(date);
};

/**
 * Similar to isBeforeNowUTC but if time is not set (00:00:00) on the given date, it will be set to the end of the day
 * @param date
 * @returns {boolean}
 */
const isBeforeTodayUTC = (date) => {
	if (!date || typeof date !== 'string') return;

	const currentDate = new Date();
	const givenDate = new Date(date);

	// if no time was set on the given date, set it to the end of the day
	if (givenDate.getHours() === 0 && givenDate.getMinutes() === 0 && givenDate.getSeconds() === 0) {
		givenDate.setHours(23, 59, 59, 999);
	}
	return currentDate < givenDate;
};

const getConfirmedStartOfExamination = (date, i18n) => {
	const formattedDate = formatDate(date);

	if (!formattedDate || formattedDate === 'NaNvalid date') return;

	const toHappen = `${i18n.t('examinationTimetable.examinationOpensOn')} ${formattedDate}`; //The examination opens on
	const happened = `${i18n.t('examinationTimetable.examinationOpenedOn')} ${formattedDate}`; //The examination opened on

	return isBeforeNowUTC(date) ? toHappen : happened;
};

const handleGrantedExtension = (date, i18n) =>
	`${i18n.t('examinationTimetable.examinationExtendedTo')} ${formatDate(date)}`; //The deadline for the close of the Examination has been extended to

const isInvalidDate = (date) =>
	date === '0000-00-00 00:00:00' || date === '0000-00-00' || date === null || !date;

const isBeforeOrAfterSentence = (date, i18n) =>
	isBeforeTodayUTC(date)
		? '' // The examination has not yet closed; display nothing
		: `${i18n.t('examinationTimetable.examinationClosedOn')} ${formatDate(date)}`; //The examination closed on

const getDateTimeExaminationEnds = (closeDate, extensionCloseDate, startDate, i18n) => {
	if (!isInvalidDate(extensionCloseDate)) return handleGrantedExtension(extensionCloseDate, i18n);

	if (!isInvalidDate(closeDate)) return isBeforeOrAfterSentence(closeDate, i18n);

	if (isInvalidDate(startDate)) return '';

	return isBeforeOrAfterSentence(moment(startDate).add(6, 'M').toISOString(), i18n);
};

module.exports = {
	isBeforeNowUTC,
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds,
	isBeforeTodayUTC
};
