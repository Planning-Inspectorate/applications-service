const { isEveryAccordionSectionOpen } = require('./helpers');
const { toggleAccordionSwitchState, setAccordionState } = require('./setters');

const addAccordionSwitchClickEvent = (
	accordionSwitch,
	accordionSections,
	accordionTranslations
) => {
	accordionSwitch.addEventListener('click', () =>
		toggleAccordionSwitchState(accordionSwitch, accordionSections, accordionTranslations)
	);
};

const addAccordionSectionClickEvent = (
	accordionSwitch,
	accordionSections,
	accordionTranslations
) => {
	accordionSections.forEach((accordionSection) => {
		accordionSection.addEventListener('toggle', () => {
			setAccordionState(
				accordionSwitch,
				isEveryAccordionSectionOpen(accordionSections),
				accordionTranslations
			);
		});
	});
};

module.exports = { addAccordionSwitchClickEvent, addAccordionSectionClickEvent };
