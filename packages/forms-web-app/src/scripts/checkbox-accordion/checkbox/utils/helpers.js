const isCheckboxesSectionSwitchChecked = (checkboxesSectionSwitch) =>
	checkboxesSectionSwitch.ariaChecked === 'true';

const isEveryCheckboxChecked = (checkboxes) => checkboxes.every((checkbox) => checkbox.checked);

module.exports = { isCheckboxesSectionSwitchChecked, isEveryCheckboxChecked };
