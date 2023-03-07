const {
	addAccordionSwitchClickEvent,
	addAccordionSectionClickEvent
} = require('./utils/event-handlers');
const { getAccordions, getaccordionSections, getAccordionSwitch } = require('./utils/getters');

const initiateAccordions = () => {
	const accordions = getAccordions();

	if (!accordions?.length) return;

	accordions.forEach((accordion) => {
		const accordionSwitch = getAccordionSwitch(accordion);
		const accordionSections = getaccordionSections(accordion);

		if (!accordionSwitch || !accordionSections.length) return;

		addAccordionSwitchClickEvent(accordionSwitch, accordionSections);
		addAccordionSectionClickEvent(accordionSwitch, accordionSections);
	});
};

module.exports = { initiateAccordions };
