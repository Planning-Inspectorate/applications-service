const moment = require('moment');

function formatDate(date) {
	const notValidDateString = !date || typeof date !== 'string';

	if (notValidDateString) return '';

	const formattedDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
	const formattedDateLength = formattedDate.length;
	const formattedMonthAndYear = formattedDate.substring(2, formattedDateLength);
	const dayWithoutZeroPrefix = Number(formattedDate.substring(0, 2));

	return `${dayWithoutZeroPrefix}${formattedMonthAndYear}`;
}

const isNullSQLDate = (testDate) => {
	if (testDate instanceof Date && !isNaN(testDate)) {
		return testDate.getTime() === new Date('0001-01-01 00:00:00').getTime();
	}
	return false;
};

module.exports = {
	formatDate,
	isNullSQLDate
};
