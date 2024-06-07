const { isEveryAccordionSectionOpen } = require('./helpers');

const setAccordionState = (accordionSwitch, isOpen, accordionTranslations) => {
	if (isOpen) accordionSwitch.innerHTML = accordionTranslations.hideAllSections;
	else accordionSwitch.innerHTML = accordionTranslations.showAllSections;
};

const setAccordionSectionsState = (accordionSections, open) => {
	accordionSections.forEach((accordionSection) => {
		if (open) accordionSection.setAttribute('open', '');
		else accordionSection.removeAttribute('open');
	});
};

const toggleAccordionSwitchState = (accordionSwitch, accordionSections, accordionTranslations) => {
	const toggledSwitchState = !isEveryAccordionSectionOpen(accordionSections);
	setAccordionSectionsState(accordionSections, toggledSwitchState);
	setAccordionState(accordionSwitch, toggledSwitchState, accordionTranslations);
};

module.exports = { setAccordionState, toggleAccordionSwitchState };
