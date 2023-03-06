const { setCheckboxesSectionSwitchState, toggleAccordionSwitchState } = require('./setters');

const onCheckboxChange = (checkboxes, checkboxesSectionSwitch) => {
	setCheckboxesSectionSwitchState(checkboxes, checkboxesSectionSwitch);
};

const onCheckboxesSectionSwitchClick = (checkboxes, checkboxesSectionSwitch) =>
	toggleAccordionSwitchState(checkboxes, checkboxesSectionSwitch);

module.exports = { onCheckboxChange, onCheckboxesSectionSwitchClick };
