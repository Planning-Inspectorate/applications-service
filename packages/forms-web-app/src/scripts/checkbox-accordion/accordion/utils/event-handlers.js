const {
	isEveryAccordionSectionSwitchChecked,
	isAccordionSwitchStateExpanded
} = require('./helpers');
const {
	setAccordionSwitchState,
	toggleAccordionSwitchState,
	setAccordionSectionSwitchesChecked
} = require('./setters');

const onAccordionSectionSwitchChange = (accordionSectionSwitches, accordionSwitch) =>
	setAccordionSwitchState(
		accordionSwitch,
		`${isEveryAccordionSectionSwitchChecked(accordionSectionSwitches)}`
	);

const onAccordionSwitchClick = (accordionSectionSwitches, accordionSwitch) => {
	toggleAccordionSwitchState(accordionSwitch);
	setAccordionSectionSwitchesChecked(
		accordionSectionSwitches,
		isAccordionSwitchStateExpanded(accordionSwitch)
	);
};

module.exports = { onAccordionSectionSwitchChange, onAccordionSwitchClick };
