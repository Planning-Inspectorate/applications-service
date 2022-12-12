const { isEveryCheckboxChecked, isCheckboxesSectionSwitchChecked } = require('./helpers');
const {
	setCheckboxesSectionSwitchState,
	toggleCheckboxesSectionSwitchState,
	setCheckboxesChecked
} = require('./setters');

const onCheckboxChange = (checkboxes, checkboxesSectionSwitch) => {
	setCheckboxesSectionSwitchState(checkboxesSectionSwitch, `${isEveryCheckboxChecked(checkboxes)}`);
};

const onCheckboxesSectionSwitchClick = (checkboxes, checkboxesSectionSwitch) => {
	toggleCheckboxesSectionSwitchState(checkboxesSectionSwitch);
	setCheckboxesChecked(checkboxes, isCheckboxesSectionSwitchChecked(checkboxesSectionSwitch));
};

module.exports = { onCheckboxChange, onCheckboxesSectionSwitchClick };
