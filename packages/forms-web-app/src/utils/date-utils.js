const moment = require('moment');

function formatDate(date) {
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const formattedDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
	const closeDate = new Date(date);
	const dayIndex = closeDate.getDay();
	const day = weekDays[dayIndex] || '';
	return `${day} ${formattedDate}`;
}

module.exports = {
	formatDate
};
