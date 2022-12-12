const { onAccordionSectionSwitchChange, onAccordionSwitchClick } = require('./event-handlers');

const applyAccordionSectionSwitchEvent = (accordionSectionSwitches, accordionSwitch) =>
	accordionSectionSwitches.forEach((accordionSectionSwitch) =>
		accordionSectionSwitch.addEventListener('change', () =>
			onAccordionSectionSwitchChange(accordionSectionSwitches, accordionSwitch)
		)
	);

const applyAccordionSwitchEvent = (accordionSectionSwitches, accordionSwitch) => {
	accordionSwitch.addEventListener('click', () =>
		onAccordionSwitchClick(accordionSectionSwitches, accordionSwitch)
	);
};

module.exports = { applyAccordionSectionSwitchEvent, applyAccordionSwitchEvent };
