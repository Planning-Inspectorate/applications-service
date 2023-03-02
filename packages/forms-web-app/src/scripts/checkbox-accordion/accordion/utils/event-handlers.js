const {
	isEveryAccordionSectionSwitchChecked,
	isAccordionSwitchStateExpanded,
	isAccordionSectionSwitchChecked
} = require('./helpers');
const {
	setAccordionSwitchState,
	toggleAccordionSwitchState,
	setAccordionSectionSwitchesChecked,
	setAccordionSectionSwitchState
} = require('./setters');

const onAccordionSectionSwitchChange = (
	accordionSectionSwitch,
	accordionSectionSwitches,
	accordionSwitch
) => {
	setAccordionSectionSwitchState(
		accordionSectionSwitch,
		isAccordionSectionSwitchChecked(accordionSectionSwitch)
	);
	setAccordionSwitchState(
		accordionSwitch,
		`${isEveryAccordionSectionSwitchChecked(accordionSectionSwitches)}`
	);
};

const onAccordionSwitchClick = (accordionSectionSwitches, accordionSwitch) => {
	toggleAccordionSwitchState(accordionSwitch);
	setAccordionSectionSwitchesChecked(
		accordionSectionSwitches,
		isAccordionSwitchStateExpanded(accordionSwitch)
	);
};

module.exports = { onAccordionSectionSwitchChange, onAccordionSwitchClick };
