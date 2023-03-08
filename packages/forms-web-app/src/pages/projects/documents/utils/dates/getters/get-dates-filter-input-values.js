const { datesFilterFormGroupInputsConfig } = require('../config');
const { getDatesFilterInputName } = require('./get-dates-filter-input-name');

const getDatesFilterInputValueFromQuery = (query, dateFilterInputName) =>
	query[dateFilterInputName] || '';

const getAllDatesFilterFormGroupInputValues = (query, inputNamePrefix) =>
	Object.keys(datesFilterFormGroupInputsConfig).reduce((acc, datesFilterFormGroupInputKey) => {
		return {
			...acc,
			[datesFilterFormGroupInputsConfig[datesFilterFormGroupInputKey].name]:
				getDatesFilterInputValueFromQuery(
					query,
					getDatesFilterInputName(
						inputNamePrefix,
						datesFilterFormGroupInputsConfig[datesFilterFormGroupInputKey].name
					)
				)
		};
	}, {});

module.exports = {
	getDatesFilterInputValueFromQuery,
	getAllDatesFilterFormGroupInputValues
};
