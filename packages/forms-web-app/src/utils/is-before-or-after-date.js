const { formatDate, isNullSQLDate } = require('./date-utils');
const moment = require('moment');

const isBeforeNowUTC = (date) => {
	if (!date || typeof date !== 'string') return;

	return new Date() < new Date(date);
};

const getConfirmedStartOfExamination = (date) => {
	const formattedDate = formatDate(date);

	if (!formattedDate || formattedDate === 'NaNvalid date') return;

	const toHappen = `The examination opens on ${formattedDate}`;
	const happened = `The examination opened on ${formattedDate}`;

	return isBeforeNowUTC(date) ? toHappen : happened;
};

const handleGrantedExtension = (date) =>
	`The deadline for the close of the Examination has been extended to ${formatDate(
		moment(date).add(6, 'M').toISOString()
	)}`;
const isAInvalidDate = (date) =>
	date === '0000-00-00 00:00:00' || date === '0000-00-00' || date === null;

const isBeforeOrAfterSentence = (date) =>
	isBeforeNowUTC(date)
		? `The examination is expected to close on ${formatDate(date)}`
		: `The examination closed on ${formatDate(date)}`;

const getDateTimeExaminationEnds = (date, extensionCloseData, startDate) => {
	if (isAInvalidDate(date) && isAInvalidDate(extensionCloseData))
		return handleGrantedExtension(startDate);

	if (isAInvalidDate(date) && !isNullSQLDate(new Date(extensionCloseData)))
		return isBeforeOrAfterSentence(extensionCloseData);

	if (isAInvalidDate(extensionCloseData) && !isNullSQLDate(new Date(date)))
		return isBeforeOrAfterSentence(date);

	return isBeforeOrAfterSentence(date);
};

module.exports = {
	isBeforeNowUTC,
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds
};
