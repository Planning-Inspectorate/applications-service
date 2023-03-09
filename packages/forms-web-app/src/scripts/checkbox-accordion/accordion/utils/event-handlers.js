const { isEveryAccordionSectionOpen } = require('./helpers');
const { toggleAccordionSwitchState, setAccordionState } = require('./setters');

const addAccordionSwitchClickEvent = (accordionSwitch, accordionSections) => {
	accordionSwitch.addEventListener('click', () =>
		toggleAccordionSwitchState(accordionSwitch, accordionSections)
	);
};

const addAccordionSectionClickEvent = (accordionSwitch, accordionSections) => {
	accordionSections.forEach((accordionSection) => {
		accordionSection.addEventListener('toggle', () => {
			setAccordionState(accordionSwitch, isEveryAccordionSectionOpen(accordionSections));
		});
	});
};

module.exports = { addAccordionSwitchClickEvent, addAccordionSectionClickEvent };
