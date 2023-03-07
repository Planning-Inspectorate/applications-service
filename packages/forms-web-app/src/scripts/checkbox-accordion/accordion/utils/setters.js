const { isEveryAccordionSectionOpen } = require('./helpers');

const setAccordionState = (accordionSwitch, isOpen) => {
	if (isOpen) accordionSwitch.innerHTML = 'Hide all sections';
	else accordionSwitch.innerHTML = 'Show all sections';
};

const setAccordionSectionsState = (accordionSections, open) => {
	accordionSections.forEach((accordionSection) => {
		if (open) accordionSection.setAttribute('open', '');
		else accordionSection.removeAttribute('open');
	});
};

const toggleAccordionSwitchState = (accordionSwitch, accordionSections) => {
	const toggledSwitchState = !isEveryAccordionSectionOpen(accordionSections);
	setAccordionSectionsState(accordionSections, toggledSwitchState);
	setAccordionState(accordionSwitch, toggledSwitchState);
};

module.exports = { setAccordionState, toggleAccordionSwitchState };
