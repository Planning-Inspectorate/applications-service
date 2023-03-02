const { isEveryCheckboxChecked } = require('./helpers');

const setCheckboxesChecked = (checkboxes, isChecked) =>
	checkboxes.forEach((checkbox) => (checkbox.checked = isChecked));

const setCheckboxesSectionSwitchState = (checkboxes, checkboxesSectionSwitch) => {
	if (isEveryCheckboxChecked(checkboxes)) checkboxesSectionSwitch.innerHTML = 'Clear filters';
	else checkboxesSectionSwitch.innerHTML = 'Select all filters';
};

const toggleAccordionSwitchState = (checkboxes, checkboxesSectionSwitch) => {
	setCheckboxesChecked(checkboxes, !isEveryCheckboxChecked(checkboxes));
	setCheckboxesSectionSwitchState(checkboxes, checkboxesSectionSwitch);
};

module.exports = {
	setCheckboxesChecked,
	setCheckboxesSectionSwitchState,
	toggleAccordionSwitchState
};
