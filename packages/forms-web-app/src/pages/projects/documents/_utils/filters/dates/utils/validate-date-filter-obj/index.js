const {
	getAllDatesFilterFormGroupInputValues
} = require('../../../../dates/getters/get-dates-filter-input-values');
const {
	datesFilterFormGroupInputsHaveEmptyValues,
	isDatesFilterFormGroupValueInvalidDate,
	isFromDateAfterToday,
	isFromDateAfterToDate
} = require('../../../../dates/validators');
const {
	addErrorsToFromDateAfterToDateFormGroups
} = require('./add-errors-to-date-after-to-date-form-groups');
const {
	addErrorsToFromDateAfterTodayFormGroup
} = require('./add-errors-to-from-date-after-today-form-group');
const {
	getDatesFilterFormGroupErrorId
} = require('../../../../dates/getters/get-dates-filter-form-group-id');
const { addErrorsToEmptyValuesFormGroup } = require('./add-errors-to-empty-values-form-group');
const { addErrorsToInvalidDateFormGroup } = require('./add-errors-to-invalid-date-form-group');

const handleDatesFilterFormGroup = (i18n, query, datesFilterFormGroup) => {
	const allDatesFilterFormGroupInputValues = getAllDatesFilterFormGroupInputValues(
		query,
		datesFilterFormGroup.inputNamePrefix
	);
	const { year, month, day } = allDatesFilterFormGroupInputValues;

	let formGroup = JSON.parse(JSON.stringify(datesFilterFormGroup));
	let errorMessageSummary;
	let newFormGroup;

	if (datesFilterFormGroupInputsHaveEmptyValues(year, month, day))
		newFormGroup = addErrorsToEmptyValuesFormGroup(
			i18n,
			formGroup,
			allDatesFilterFormGroupInputValues
		);
	else if (isDatesFilterFormGroupValueInvalidDate(year, month, day))
		newFormGroup = addErrorsToInvalidDateFormGroup(i18n, formGroup);
	else newFormGroup = formGroup;

	if (newFormGroup.errorMessageText)
		errorMessageSummary = {
			href: `#${getDatesFilterFormGroupErrorId(newFormGroup.name)}`,
			text: newFormGroup.errorMessageText
		};

	return {
		formGroup: newFormGroup,
		errorMessageSummary
	};
};

const handleDatesFilterFormGroups = (i18n, query, datesFilter) => {
	const localDatesFilter = JSON.parse(JSON.stringify(datesFilter));
	const fromGroups = [];
	let errorSummaryList = [];
	localDatesFilter.formGroups.forEach((datesFilterFormGroup) => {
		const { formGroup, errorMessageSummary } = handleDatesFilterFormGroup(
			i18n,
			query,
			datesFilterFormGroup
		);
		fromGroups.push(formGroup);
		if (errorMessageSummary) errorSummaryList.push(errorMessageSummary);
	});

	localDatesFilter.formGroups = fromGroups;
	localDatesFilter.errorSummaryList = errorSummaryList;
	return localDatesFilter;
};

const validateDatesFilterObj = (i18n, query, datesFilterObj) => {
	let localDatesFilterObj = JSON.parse(JSON.stringify(datesFilterObj));

	localDatesFilterObj = handleDatesFilterFormGroups(i18n, query, localDatesFilterObj);

	if (localDatesFilterObj.errorSummaryList.length === 0) {
		if (isFromDateAfterToDate(query))
			localDatesFilterObj = addErrorsToFromDateAfterToDateFormGroups(i18n, localDatesFilterObj);
		else if (isFromDateAfterToday(query))
			localDatesFilterObj = addErrorsToFromDateAfterTodayFormGroup(i18n, localDatesFilterObj);
	}

	return localDatesFilterObj;
};

module.exports = { validateDatesFilterObj };
