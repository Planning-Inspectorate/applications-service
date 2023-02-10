const { buildDateSting } = require('../../../../../../utils/date-utils');
const { formatDateStringForDocumentsApi } = require('./format-date-string-for-documents-api');
const {
	isDatesFilterFormGroupValueValidDateString,
	isDatesFilterDateValuesValid
} = require('../validators');
const {
	getAllDatesFilterFormGroupInputValues
} = require('../getters/get-dates-filter-input-values');
const { datesFilterFormGroupsConfig } = require('../config');

const getDatesFilterPublishedDate = (year, month, day) => {
	let datePublishedValue = null;
	const datesFilterFormGroupValueDateString = buildDateSting(year, month, day);

	if (isDatesFilterFormGroupValueValidDateString(datesFilterFormGroupValueDateString))
		datePublishedValue = formatDateStringForDocumentsApi(datesFilterFormGroupValueDateString);

	return datePublishedValue;
};

const getDatesFilterPublishedDates = (query) => {
	const datesFilterPublishedDates = {
		datePublishedFrom: null,
		datePublishedTo: null
	};

	if (isDatesFilterDateValuesValid(query)) {
		const {
			year: yearFrom,
			month: monthFrom,
			day: dayFrom
		} = getAllDatesFilterFormGroupInputValues(query, datesFilterFormGroupsConfig.from.name);
		const {
			year: yearTo,
			month: monthTo,
			day: dayTo
		} = getAllDatesFilterFormGroupInputValues(query, datesFilterFormGroupsConfig.to.name);

		datesFilterPublishedDates.datePublishedFrom = getDatesFilterPublishedDate(
			yearFrom,
			monthFrom,
			dayFrom
		);
		datesFilterPublishedDates.datePublishedTo = getDatesFilterPublishedDate(yearTo, monthTo, dayTo);
	}

	return datesFilterPublishedDates;
};

module.exports = { getDatesFilterPublishedDates };
