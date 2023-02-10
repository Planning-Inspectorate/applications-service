const { getDatesFilterInputName } = require('../../../dates/getters');
const {
	getDatesFilterInputValueFromQuery
} = require('../../../dates/getters/get-dates-filter-input-values');

const getDateFilterInputsViewModel = (query, dateFilterFormGroup) => {
	return dateFilterFormGroup.inputs.map((dateFilterFormGroupInput) => {
		return {
			...dateFilterFormGroupInput,
			value: getDatesFilterInputValueFromQuery(
				query,
				getDatesFilterInputName(dateFilterFormGroup.inputNamePrefix, dateFilterFormGroupInput.name)
			)
		};
	});
};

module.exports = { getDateFilterInputsViewModel };
