const { accordionSwitchId } = require('./config');
const { getAccordionSections } = require('./getters');
const { setAccordionSwitchState } = require('./setters');

const buildAccordionSwitch = (accordion) => {
	const accordionSwitch = createAccordionSwitch();
	setAccordionSwitchState(accordionSwitch, 'false');
	insertAccordionSwitch(accordion, accordionSwitch);
};

const createAccordionSwitch = () => {
	const accordionSwitch = document.createElement('button');
	accordionSwitch.type = 'button';
	accordionSwitch.classList = accordionSwitchId;
	return accordionSwitch;
};

const insertAccordionSwitch = (accordion, accordionSwitch) => {
	const accordionSections = getAccordionSections(accordion);
	if (!accordionSections) return;
	accordionSections.insertBefore(accordionSwitch, accordionSections.firstChild);
};

module.exports = { buildAccordionSwitch };
