const { getDatesFilterFormGroupErrorId } = require('../../../../dates/getters');
const { addErrorClassesToInputs } = require('./utils/add-error-classes-to-inputs');
const { datesFilterFormGroupsConfig } = require('../../../../dates/config');

const getFromDateAfterTodayErrorMessageText = (i18n) =>
	i18n.t('projectsDocuments.errors.fromDatePast');

const addErrorToDateFromFormGroup = (i18n, formGroup) => {
	const formGroupErrorValues = {
		errorMessageText: '',
		inputs: formGroup.inputs
	};

	if (formGroup.name === datesFilterFormGroupsConfig.from.name) {
		formGroupErrorValues.errorMessageText = getFromDateAfterTodayErrorMessageText(i18n);
		formGroupErrorValues.inputs = addErrorClassesToInputs(formGroupErrorValues.inputs);
	}

	return formGroupErrorValues;
};

const mapFormGroupsWithDateFromErrors = (i18n, formGroups) =>
	formGroups.map((formGroup) => ({
		...formGroup,
		...addErrorToDateFromFormGroup(i18n, formGroup)
	}));

const addErrorsToFromDateAfterTodayFormGroup = (i18n, datesFilter) => ({
	...datesFilter,
	formGroups: mapFormGroupsWithDateFromErrors(i18n, datesFilter.formGroups),
	errorSummaryList: [
		{
			href: `#${getDatesFilterFormGroupErrorId(datesFilterFormGroupsConfig.from.name)}`,
			text: getFromDateAfterTodayErrorMessageText(i18n)
		}
	]
});

module.exports = { addErrorsToFromDateAfterTodayFormGroup };
