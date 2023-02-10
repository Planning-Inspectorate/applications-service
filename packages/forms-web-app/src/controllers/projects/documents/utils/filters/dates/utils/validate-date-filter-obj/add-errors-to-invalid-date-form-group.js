const addErrorsToInvalidDateFormGroup = (formGroup) => {
	const localFormGroup = JSON.parse(JSON.stringify(formGroup));
	localFormGroup.errorMessageText = `The ${localFormGroup.errorMessageTitle} date must be a real date`;
	localFormGroup.inputs.forEach((datesFilterFormGroupInput) => {
		datesFilterFormGroupInput.classes = `${datesFilterFormGroupInput.classes} govuk-input--error`;
	});

	return localFormGroup;
};

module.exports = { addErrorsToInvalidDateFormGroup };
