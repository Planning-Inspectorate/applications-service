const { isCheckboxesSectionSwitchChecked } = require('./helpers');

const setCheckboxesChecked = (checkboxes, isChecked) =>
	checkboxes.forEach((checkbox) => (checkbox.checked = isChecked));

const setCheckboxesSectionSwitchState = (checkboxesSectionSwitch, isChecked) => {
	checkboxesSectionSwitch.ariaChecked = isChecked;
	if (isCheckboxesSectionSwitchChecked(checkboxesSectionSwitch))
		checkboxesSectionSwitch.innerHTML = 'Clear filters';
	else checkboxesSectionSwitch.innerHTML = 'Select all filters';
};

const toggleCheckboxesSectionSwitchState = (checkboxesSectionSwitch) =>
	setCheckboxesSectionSwitchState(
		checkboxesSectionSwitch,
		`${!isCheckboxesSectionSwitchChecked(checkboxesSectionSwitch)}`
	);

module.exports = {
	setCheckboxesChecked,
	setCheckboxesSectionSwitchState,
	toggleCheckboxesSectionSwitchState
};
