const { getDatesFilterFormGroupId } = require('../../../dates/getters');
const {
	datesFilterFormGroupsConfig,
	datesFilterFormGroupInputsConfig
} = require('../../../dates/config');

const buildDatesFilterObj = () => {
	const buildDatesFilterFormGroupInputs = () => {
		return Object.keys(datesFilterFormGroupInputsConfig).map((datesFilterFormGroupInputKey) => {
			return {
				...datesFilterFormGroupInputsConfig[datesFilterFormGroupInputKey]
			};
		});
	};

	const buildDatesFilterFormGroups = () => {
		return Object.keys(datesFilterFormGroupsConfig).map((datesFilterFormGroupKey) => {
			const datesFilterFormGroup = datesFilterFormGroupsConfig[datesFilterFormGroupKey];
			return {
				...datesFilterFormGroup,
				id: getDatesFilterFormGroupId(datesFilterFormGroup.name),
				inputs: buildDatesFilterFormGroupInputs(),
				inputNamePrefix: datesFilterFormGroup.name,
				title: datesFilterFormGroup.title
			};
		});
	};

	const datesFilterObj = {
		errorSummaryList: [],
		title: 'Date published',
		formGroups: buildDatesFilterFormGroups()
	};

	return datesFilterObj;
};

module.exports = { buildDatesFilterObj };
