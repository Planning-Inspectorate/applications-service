const addErrorsToEmptyValuesFormGroup = (formGroup, allDatesFilterFormGroupInputValues) => {
	const localFormGroup = JSON.parse(JSON.stringify(formGroup));
	localFormGroup.inputs.forEach((input) => {
		const inputValue = allDatesFilterFormGroupInputValues[input.name];
		if (!inputValue) {
			input.classes = `${input.classes} govuk-input--error`;
			localFormGroup.errorMessageText = localFormGroup.errorMessageText
				? `${localFormGroup.errorMessageText} and ${input.name}`
				: `The ${localFormGroup.errorMessageTitle} date must include ${input.name}`;
		}
	});

	return localFormGroup;
};

module.exports = {
	addErrorsToEmptyValuesFormGroup
};
