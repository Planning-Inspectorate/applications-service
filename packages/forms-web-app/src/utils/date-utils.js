const moment = require('moment'); //TODO: remove this and use dayjs or date-fns to handle dates rather than js date objects
const dayjs = require('dayjs');
const dayjsUtcPlugin = require('dayjs/plugin/utc');
const dayjsTimezonePlugin = require('dayjs/plugin/timezone');

dayjs.extend(dayjsUtcPlugin);
dayjs.extend(dayjsTimezonePlugin);

const buildDateSting = (year, month, day) => `${year}-${month}-${day}`;

const getDate = (date) => new Date(date);

const getDateNow = () => new Date();

const getYearNow = () => getDateNow().getFullYear();

function formatDate(date, locale = 'en', format = 'DD MMMM YYYY') {
	const notValidDateString = !date || typeof date !== 'string';

	if (notValidDateString) return '';

	const formattedDate = moment(date, 'YYYY-MM-DD').locale(locale).format(format);
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

const setTimeToStartOfDay = (date) => new Date(date).setHours(0, 0, 0, 0);

const setTimeToEndOfDay = (date) => new Date(date).setHours(23, 59, 59, 999);

const localiseDate = (date, format = 'YYYY-MM-DD HH:mm:ss.SSS', timezone = 'Europe/London') => {
	if (!date || !dayjs(date).isValid()) {
		throw new Error(`Valid date is required: ${date}`);
	}

	return dayjs(date).tz(timezone).format(format);
};

module.exports = {
	buildDateSting,
	getDate,
	getDateNow,
	getYearNow,
	formatDate,
	localiseDate,
	isNullSQLDate,
	setTimeToStartOfDay,
	setTimeToEndOfDay
};
