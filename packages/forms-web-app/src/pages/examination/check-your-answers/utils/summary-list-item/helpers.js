const getSelectedOptionText = (options, value) =>
	options[Object.keys(options).find((option) => options[option].value === value)]?.text;

module.exports = { getSelectedOptionText };
