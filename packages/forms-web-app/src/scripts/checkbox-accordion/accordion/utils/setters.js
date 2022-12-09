const { isAccordionSwitchStateExpanded } = require('./helpers');

const setAccordionSectionSwitchesChecked = (accordionSectionSwitches, isChecked) =>
	accordionSectionSwitches.forEach(
		(accordionSectionSwitch) => (accordionSectionSwitch.checked = isChecked)
	);

const setAccordionSwitchState = (accordionSwitch, isExpanded) => {
	accordionSwitch.ariaExpanded = isExpanded;
	if (isAccordionSwitchStateExpanded(accordionSwitch))
		accordionSwitch.innerHTML = 'Hide all sections';
	else accordionSwitch.innerHTML = 'Show all sections';
};

const toggleAccordionSwitchState = (accordionSwitch) =>
	setAccordionSwitchState(accordionSwitch, `${!isAccordionSwitchStateExpanded(accordionSwitch)}`);

module.exports = {
	setAccordionSectionSwitchesChecked,
	setAccordionSwitchState,
	toggleAccordionSwitchState
};
