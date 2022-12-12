const isAccordionSwitchStateExpanded = (accordionSwitch) => accordionSwitch.ariaExpanded === 'true';

const isEveryAccordionSectionSwitchChecked = (accordionSectionSwitches) =>
	accordionSectionSwitches.every((accordionSectionSwitch) => accordionSectionSwitch.checked);

module.exports = { isAccordionSwitchStateExpanded, isEveryAccordionSectionSwitchChecked };
