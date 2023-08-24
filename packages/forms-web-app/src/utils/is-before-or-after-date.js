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

const getConfirmedStartOfExamination = (date) => {
	const formattedDate = formatDate(date);

	if (!formattedDate || formattedDate === 'NaNvalid date') return;

	const toHappen = `The examination opens on ${formattedDate}`;
	const happened = `The examination opened on ${formattedDate}`;

	return isBeforeNowUTC(date) ? toHappen : happened;
};

const handleGrantedExtension = (date) =>
	`The deadline for the close of the Examination has been extended to ${formatDate(date)}`;

const isInvalidDate = (date) =>
	date === '0000-00-00 00:00:00' || date === '0000-00-00' || date === null;

const isBeforeOrAfterSentence = (date) =>
	isBeforeTodayUTC(date)
		? `The examination is expected to close on ${formatDate(date)}`
		: `The examination closed on ${formatDate(date)}`;

const getDateTimeExaminationEnds = (closeDate, extensionCloseDate, startDate) => {
	if (!isInvalidDate(closeDate)) return isBeforeOrAfterSentence(closeDate);

	if (!isInvalidDate(extensionCloseDate)) return handleGrantedExtension(extensionCloseDate);

	if (isInvalidDate(startDate)) return '';

	return isBeforeOrAfterSentence(moment(startDate).add(6, 'M').toISOString());
};

module.exports = {
	isBeforeNowUTC,
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds,
	isBeforeTodayUTC
};
