const { checkboxesId, checkboxesSectionId, checkboxesSectionSwitchClassId } = require('./config');

const getCheckboxes = (checkboxesSection) => [
	...checkboxesSection.querySelectorAll(`.${checkboxesId}`)
];

const getCheckboxesSections = () => [...document.querySelectorAll(`.${checkboxesSectionId}`)];

const getCheckboxesSectionSwitch = (checkboxesSection) =>
	checkboxesSection.querySelector(`.${checkboxesSectionSwitchClassId}`);

module.exports = {
	getCheckboxes,
	getCheckboxesSections,
	getCheckboxesSectionSwitch
};
