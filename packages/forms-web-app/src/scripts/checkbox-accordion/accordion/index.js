const { applyAccordionSectionSwitchEvent, applyAccordionSwitchEvent } = require('./utils/appliers');
const { buildAccordionSwitch } = require('./utils/builders');
const {
	getAccordions,
	getAccordionSectionSwitches,
	getAccordionSwitch
} = require('./utils/getters');

const initiateAccordions = () => {
	const accordions = getAccordions();

	if (!accordions?.length) return;

	accordions.forEach((accordion) => {
		buildAccordionSwitch(accordion);

		const accordionSectionSwitches = getAccordionSectionSwitches(accordion);
		const accordionSwitch = getAccordionSwitch(accordion);

		if (!accordionSectionSwitches.length || !accordionSwitch) return;

		applyAccordionSectionSwitchEvent(accordionSectionSwitches, accordionSwitch);
		applyAccordionSwitchEvent(accordionSectionSwitches, accordionSwitch);
	});
};

module.exports = { initiateAccordions };
