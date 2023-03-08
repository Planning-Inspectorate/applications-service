const { getDatesFilterFormGroupErrorId } = require('../../../../dates/getters');
const { addErrorClassesToInputs } = require('./utils/add-error-classes-to-inputs');
const { datesFilterFormGroupsConfig } = require('../../../../dates/config');

const fromDateAfterToDateErrorMessageText = 'The from date entered should start before the to date';

const mapFormGroupsWithErrors = (formGroups) =>
	formGroups.map((formGroup) => ({
		...formGroup,
		errorMessageText:
			formGroup.name === datesFilterFormGroupsConfig.from.name
				? fromDateAfterToDateErrorMessageText
				: '',
		hasError: true,
		inputs: addErrorClassesToInputs(formGroup.inputs)
	}));

const addErrorsToFromDateAfterToDateFormGroups = (datesFilter) => ({
	...datesFilter,
	formGroups: mapFormGroupsWithErrors(datesFilter.formGroups),
	errorSummaryList: [
		{
			href: `#${getDatesFilterFormGroupErrorId(datesFilterFormGroupsConfig.from.name)}`,
			text: fromDateAfterToDateErrorMessageText
		}
	]
});

module.exports = { addErrorsToFromDateAfterToDateFormGroups };
