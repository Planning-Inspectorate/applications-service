const addErrorClassesToInputs = (inputs) =>
	inputs.map((input) => ({
		...input,
		classes: `${input.classes} govuk-input--error`
	}));

module.exports = { addErrorClassesToInputs };
