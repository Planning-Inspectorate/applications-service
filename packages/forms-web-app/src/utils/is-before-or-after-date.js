const { getNow } = require('./get-now');
const { formatDate } = require('./date-utils');

const isBeforeNowUTC = (date) => {
	if (!date || typeof date !== 'string') return;

	return getNow() < new Date(date);
};

const isBeforeOrAfterDate = (date, optionsArray) => {
	if (
		!date ||
		typeof date !== 'string' ||
		!Array.isArray(optionsArray) ||
		!optionsArray.length ||
		optionsArray.length !== 2
	)
		return;

	const formattedDate = formatDate(date);

	const [toHappen, happened] = optionsArray.map((str) => `${str} ${formattedDate}`);

	return isBeforeNowUTC(date) ? toHappen : happened;
};

module.exports = { isBeforeNowUTC, isBeforeOrAfterDate };
