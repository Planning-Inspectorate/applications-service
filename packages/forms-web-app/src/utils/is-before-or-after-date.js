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

const handleGrantedExtension = (extensionCloseData) =>
	`The deadline for the close of the Examination has been extended to ${formatDate(
		extensionCloseData
	)}`;

const handleNoDatesExtensionAddSixMonthsToStart = (startDate) =>
	`The examination is expected to close on ${formatDate(
		moment(startDate).add(6, 'M').toISOString()
	)}`;

const getDateTimeExaminationEnds = (date, extensionCloseData, startDate) => {
	if (!date && !extensionCloseData) return handleNoDatesExtensionAddSixMonthsToStart(startDate);

	if (!date && extensionCloseData) return handleGrantedExtension(extensionCloseData);

	if (
		date &&
		!isNullSQLDate(new Date(date)) &&
		extensionCloseData &&
		!isNullSQLDate(new Date(extensionCloseData))
	)
		return handleNoDatesExtensionAddSixMonthsToStart(startDate);

	const formattedDate = formatDate(date);
	if (!formattedDate || formattedDate === 'NaNvalid date')
		return handleNoDatesExtensionAddSixMonthsToStart(startDate);

	const toHappen = `The examination is expected to close on ${formattedDate}`;
	const happened = `The examination closed on ${formattedDate}`;

	return isBeforeNowUTC(date) ? toHappen : happened;
};

module.exports = {
	isBeforeNowUTC,
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds
};
