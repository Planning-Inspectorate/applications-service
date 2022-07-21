const moment = require('moment');

function formatDate(date, withoutZeroOnDay = false) {
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const formattedDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
	const closeDate = new Date(date);
	const dayIndex = closeDate.getDay();
	const day = weekDays[dayIndex] || '';
	console.log({ freakingDay: formattedDate });
	return withoutZeroOnDay
		? `${Number(formattedDate.slice(0, 2)).toString()} ${formattedDate.substring(
				2,
				formattedDate.length
		  )}`
		: `${day} ${formattedDate}`;
}

function formatDayDateWithoutPrefixZero(date) {
	const notValidDateString =
		!date || typeof date !== 'string' || /\s/.test(date) || date.length !== 10;

	if (notValidDateString) return '';

	const formattedDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
	const formattedDateLength = formattedDate.length;
	const formattedMonthAndYear = formattedDate.substring(2, formattedDateLength);
	const dayWithoutZeroPrefix = Number(formattedDate.substring(0, 2));

	return `${dayWithoutZeroPrefix}${formattedMonthAndYear}`;
}

module.exports = {
	formatDate,
	formatDayDateWithoutPrefixZero
};
