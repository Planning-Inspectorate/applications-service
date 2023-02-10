const { getDateFilterInputsViewModel } = require('./get-date-filter-inputs-view-model');

const getDateFilterFormGroupsViewModel = (query, dateFilterFormGroups) =>
	dateFilterFormGroups.map((dateFilterFormGroup) => ({
		...dateFilterFormGroup,
		errorMessage:
			dateFilterFormGroup.hasError || dateFilterFormGroup.errorMessageText
				? { text: dateFilterFormGroup.errorMessageText || '' }
				: null,
		inputs: getDateFilterInputsViewModel(query, dateFilterFormGroup)
	}));

module.exports = { getDateFilterFormGroupsViewModel };
