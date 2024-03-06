const { registeringForOptions } = require('../config');

const isRegisteringFor = (selectedOption) => ({
	agent: selectedOption === registeringForOptions.agent,
	myself: selectedOption === registeringForOptions.myself,
	organisation: selectedOption === registeringForOptions.organisation
});

const isSelectedRegisteringForOptionNew = (selectedOption, previousOption) =>
	selectedOption !== previousOption;

module.exports = {
	isRegisteringFor,
	isSelectedRegisteringForOptionNew
};
