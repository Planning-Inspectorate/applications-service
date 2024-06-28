const { getDatesFilterFormGroupErrorId } = require('../../../../dates/getters');
const { addErrorClassesToInputs } = require('./utils/add-error-classes-to-inputs');
const { datesFilterFormGroupsConfig } = require('../../../../dates/config');

const getFromDateAfterToDateErrorMessageText = (i18n) =>
	i18n.t('projectsDocuments.errors.fromDateAfterToDate');

const mapFormGroupsWithErrors = (i18n, formGroups) =>
	formGroups.map((formGroup) => ({
		...formGroup,
		errorMessageText:
			formGroup.name === datesFilterFormGroupsConfig.from.name
				? getFromDateAfterToDateErrorMessageText(i18n)
				: '',
		hasError: true,
		inputs: addErrorClassesToInputs(formGroup.inputs)
	}));

const addErrorsToFromDateAfterToDateFormGroups = (i18n, datesFilter) => ({
	...datesFilter,
	formGroups: mapFormGroupsWithErrors(i18n, datesFilter.formGroups),
	errorSummaryList: [
		{
			href: `#${getDatesFilterFormGroupErrorId(datesFilterFormGroupsConfig.from.name)}`,
			text: getFromDateAfterToDateErrorMessageText(i18n)
		}
	]
});

module.exports = { addErrorsToFromDateAfterToDateFormGroups };
