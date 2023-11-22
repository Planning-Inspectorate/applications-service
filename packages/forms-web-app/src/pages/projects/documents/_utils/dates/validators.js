const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { buildDateSting } = require('../../../../../utils/date-utils');
const {
	getAllDatesFilterFormGroupInputValues
} = require('./getters/get-dates-filter-input-values');
const { datesFilterFormGroupsConfig } = require('./config');
const { validUserInputDateStringFormats } = require('./config');

dayjs.extend(customParseFormat);

const isDatesFilterFormGroupValueValidDateString = (date) =>
	validUserInputDateStringFormats.some((validUserInputDateFormat) =>
		dayjs(date, validUserInputDateFormat, true).isValid()
	);

const allDatesFilterFormGroupInputValuesEmpty = (year, month, day) => {
	return !year && !month && !day;
};

const allDatesFilterFormGroupInputValuesSet = (year, month, day) => {
	return year && month && day;
};

const datesFilterFormGroupInputsHaveEmptyValues = (year, month, day) => {
	return (
		!allDatesFilterFormGroupInputValuesEmpty(year, month, day) &&
		!allDatesFilterFormGroupInputValuesSet(year, month, day)
	);
};

const isDatesFilterFormGroupValueInvalidDate = (year, month, day) => {
	return (
		allDatesFilterFormGroupInputValuesSet(year, month, day) &&
		!isDatesFilterFormGroupValueValidDateString(buildDateSting(year, month, day))
	);
};

const isFromDateAfterToDate = (query) => {
	const {
		year: fromYear,
		month: fromMonth,
		day: fromDay
	} = getAllDatesFilterFormGroupInputValues(query, datesFilterFormGroupsConfig.from.name);
	const {
		year: toYear,
		month: toMonth,
		day: toDay
	} = getAllDatesFilterFormGroupInputValues(query, datesFilterFormGroupsConfig.to.name);

	const fromDateString = buildDateSting(fromYear, fromMonth, fromDay);
	const toDateString = buildDateSting(toYear, toMonth, toDay);

	const fromDateStringIsValid = isDatesFilterFormGroupValueValidDateString(fromDateString);
	const toDateStringIsValid = isDatesFilterFormGroupValueValidDateString(toDateString);

	return (
		fromDateStringIsValid &&
		toDateStringIsValid &&
		dayjs(fromDateString).isAfter(dayjs(toDateString))
	);
};

const isFromDateAfterToday = (query) => {
	const { year, month, day } = getAllDatesFilterFormGroupInputValues(
		query,
		datesFilterFormGroupsConfig.from.name
	);

	const dateString = buildDateSting(year, month, day);

	const dateStingIsValid = isDatesFilterFormGroupValueValidDateString(dateString);

	return dateStingIsValid && dayjs(dateString).isAfter(dayjs());
};

const isDatesFilterDateValuesValid = (query) => {
	return !isFromDateAfterToDate(query) && !isFromDateAfterToday(query);
};

module.exports = {
	isDatesFilterFormGroupValueValidDateString,
	datesFilterFormGroupInputsHaveEmptyValues,
	isDatesFilterFormGroupValueInvalidDate,
	isFromDateAfterToDate,
	isFromDateAfterToday,
	isDatesFilterDateValuesValid
};
