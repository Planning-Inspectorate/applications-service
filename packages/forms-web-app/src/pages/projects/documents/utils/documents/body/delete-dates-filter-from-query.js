const {
	datesFilterFormGroupsConfig,
	datesFilterFormGroupInputsConfig
} = require('../../dates/config');
const { getDatesFilterInputName } = require('../../dates/getters');

const deleteDatesFilterFromQuery = (query) => {
	Object.keys(datesFilterFormGroupsConfig).forEach((datesFilterFormGroupKey) => {
		const datesFilterFormGroup = datesFilterFormGroupsConfig[datesFilterFormGroupKey];
		Object.keys(datesFilterFormGroupInputsConfig).forEach((datesFilterFormGroupInputKey) => {
			const datesFilterFormGroupInput =
				datesFilterFormGroupInputsConfig[datesFilterFormGroupInputKey];
			delete query[
				getDatesFilterInputName(datesFilterFormGroup.name, datesFilterFormGroupInput.name)
			];
		});
	});
};

module.exports = { deleteDatesFilterFromQuery };
