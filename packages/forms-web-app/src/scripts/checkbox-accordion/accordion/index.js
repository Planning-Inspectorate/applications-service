const {
	addAccordionSwitchClickEvent,
	addAccordionSectionClickEvent
} = require('./utils/event-handlers');
const {
	getAccordions,
	getaccordionSections,
	getAccordionSwitch,
	getAccordionTranslations
} = require('./utils/getters');

const initiateAccordions = () => {
	const accordions = getAccordions();

	if (!accordions?.length) return;

	accordions.forEach((accordion) => {
		const accordionSwitch = getAccordionSwitch(accordion);
		const accordionSections = getaccordionSections(accordion);
		const accordionTranslations = getAccordionTranslations(accordion);

		if (!accordionSwitch || !accordionSections.length) return;

		addAccordionSwitchClickEvent(accordionSwitch, accordionSections, accordionTranslations);
		addAccordionSectionClickEvent(accordionSwitch, accordionSections, accordionTranslations);
	});
};

module.exports = { initiateAccordions };
