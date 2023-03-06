const isAccordionSectionSwitchChecked = (accordionSectionSwitch) => accordionSectionSwitch.checked;

const isAccordionSwitchStateExpanded = (accordionSwitch) => accordionSwitch.ariaExpanded === 'true';

const isEveryAccordionSectionSwitchChecked = (accordionSectionSwitches) =>
	accordionSectionSwitches.every((accordionSectionSwitch) => accordionSectionSwitch.checked);

module.exports = {
	isAccordionSectionSwitchChecked,
	isAccordionSwitchStateExpanded,
	isEveryAccordionSectionSwitchChecked
};
