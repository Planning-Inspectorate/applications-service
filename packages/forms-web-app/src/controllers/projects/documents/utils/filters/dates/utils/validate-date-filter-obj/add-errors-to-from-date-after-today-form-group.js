const { getDatesFilterFormGroupErrorId } = require('../../../../dates/getters');
const { addErrorClassesToInputs } = require('./utils/add-error-classes-to-inputs');
const { datesFilterFormGroupsConfig } = require('../../../../dates/config');
const fromDateAfterTodayErrorMessageText = 'The from date must be in the past';

const addErrorToDateFromFormGroup = (formGroup) => {
	const formGroupErrorValues = {
		errorMessageText: '',
		inputs: formGroup.inputs
	};

	if (formGroup.name === datesFilterFormGroupsConfig.from.name) {
		formGroupErrorValues.errorMessageText = fromDateAfterTodayErrorMessageText;
		formGroupErrorValues.inputs = addErrorClassesToInputs(formGroupErrorValues.inputs);
	}

	return formGroupErrorValues;
};

const mapFormGroupsWithDateFromErrors = (formGroups) =>
	formGroups.map((formGroup) => ({
		...formGroup,
		...addErrorToDateFromFormGroup(formGroup)
	}));

const addErrorsToFromDateAfterTodayFormGroup = (datesFilter) => ({
	...datesFilter,
	formGroups: mapFormGroupsWithDateFromErrors(datesFilter.formGroups),
	errorSummaryList: [
		{
			href: `#${getDatesFilterFormGroupErrorId(datesFilterFormGroupsConfig.from.name)}`,
			text: fromDateAfterTodayErrorMessageText
		}
	]
});

module.exports = { addErrorsToFromDateAfterTodayFormGroup };
