const addErrorsToInvalidDateFormGroup = (i18n, formGroup) => {
	const localFormGroup = JSON.parse(JSON.stringify(formGroup));
	localFormGroup.errorMessageText = i18n.t('projectsDocuments.errors.mustBeRealDate', {
		formGroup: localFormGroup.errorMessageTitle
	});
	localFormGroup.inputs.forEach((datesFilterFormGroupInput) => {
		datesFilterFormGroupInput.classes = `${datesFilterFormGroupInput.classes} govuk-input--error`;
	});

	return localFormGroup;
};

module.exports = { addErrorsToInvalidDateFormGroup };
