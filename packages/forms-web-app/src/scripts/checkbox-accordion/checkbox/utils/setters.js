const { isEveryCheckboxChecked } = require('./helpers');

const setCheckboxesChecked = (checkboxes, isChecked) =>
	checkboxes.forEach((checkbox) => (checkbox.checked = isChecked));

const setCheckboxSectionSwitchState = (checkboxes, checkboxSectionSwitch, checkboxTranslations) => {
	if (isEveryCheckboxChecked(checkboxes))
		checkboxSectionSwitch.innerHTML = checkboxTranslations.clearFilters;
	else checkboxSectionSwitch.innerHTML = checkboxTranslations.selectAllFilters;
};

const toggleAccordionSwitchState = (checkboxes, checkboxSectionSwitch, checkboxTranslations) => {
	setCheckboxesChecked(checkboxes, !isEveryCheckboxChecked(checkboxes));
	setCheckboxSectionSwitchState(checkboxes, checkboxSectionSwitch, checkboxTranslations);
};

module.exports = {
	setCheckboxesChecked,
	setCheckboxSectionSwitchState,
	toggleAccordionSwitchState
};
