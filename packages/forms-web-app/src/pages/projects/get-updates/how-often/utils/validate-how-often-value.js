const { validationErrorMessage } = require('../config');
const { formatHowOftenValue } = require('./format-how-often-value');

const hasInvalidValueCombination = (howOftenValues) =>
	howOftenValues.length > 1 && howOftenValues.includes('allUpdates');

const validateHowOftenValue = (howOftenValues) => {
	const formattedHowOftenValue = formatHowOftenValue(howOftenValues);

	if (hasInvalidValueCombination(formattedHowOftenValue)) throw new Error(validationErrorMessage);

	return true;
};

module.exports = { validateHowOftenValue };
