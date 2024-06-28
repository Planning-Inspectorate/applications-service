const addErrorsToEmptyValuesFormGroup = (i18n, formGroup, allDatesFilterFormGroupInputValues) => {
	const localFormGroup = JSON.parse(JSON.stringify(formGroup));
	localFormGroup.inputs.forEach((input) => {
		const inputValue = allDatesFilterFormGroupInputValues[input.name];
		if (!inputValue) {
			input.classes = `${input.classes} govuk-input--error`;

			const inputLabel = input.label.toLowerCase();

			localFormGroup.errorMessageText = localFormGroup.errorMessageText
				? i18n.t('projectsDocuments.errors.emptyValues', {
						errorMessage: localFormGroup.errorMessageText,
						emptyValue: inputLabel
				  })
				: i18n.t('projectsDocuments.errors.emptyValue', {
						formGroup: localFormGroup.errorMessageTitle,
						emptyValue: inputLabel
				  });
		}
	});

	return localFormGroup;
};

module.exports = {
	addErrorsToEmptyValuesFormGroup
};
