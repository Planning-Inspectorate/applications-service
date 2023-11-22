const {
	mapDatesFilterFormGroupsConfig,
	mapDatesFilterFormGroupInputsConfig
} = require('./mappers');

const documentsApiDateFormat = 'YYYY-MM-DD';
const validUserInputDateStringFormats = [
	documentsApiDateFormat,
	'YYYY-M-D',
	'YYYY-MM-D',
	'YYYY-M-DD'
];

const datesFilterFormGroupsConfig = {
	from: mapDatesFilterFormGroupsConfig('from', 'date-from', 'From'),
	to: mapDatesFilterFormGroupsConfig('to', 'date-to', 'To')
};

const datesFilterFormGroupInputsConfig = {
	day: mapDatesFilterFormGroupInputsConfig('govuk-input--width-2', 'day'),
	month: mapDatesFilterFormGroupInputsConfig('govuk-input--width-2', 'month'),
	year: mapDatesFilterFormGroupInputsConfig('govuk-input--width-4', 'year')
};

module.exports = {
	documentsApiDateFormat,
	validUserInputDateStringFormats,
	datesFilterFormGroupsConfig,
	datesFilterFormGroupInputsConfig
};
