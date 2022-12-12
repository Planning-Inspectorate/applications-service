const { checkboxesId, checkboxesSectionId, checkboxesSectionSwitchId } = require('./config');

const getCheckboxes = (checkboxesSection) => [
	...checkboxesSection.querySelectorAll(`.${checkboxesId}`)
];

const getCheckboxesSections = () => [...document.querySelectorAll(`.${checkboxesSectionId}`)];

const getCheckboxesSectionSwitch = (checkboxesSection) =>
	checkboxesSection.querySelector(`.${checkboxesSectionSwitchId}`);

module.exports = {
	getCheckboxes,
	getCheckboxesSections,
	getCheckboxesSectionSwitch
};
