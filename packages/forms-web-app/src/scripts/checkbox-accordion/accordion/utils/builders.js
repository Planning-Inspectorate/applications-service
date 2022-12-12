const { accordionSwitchId } = require('./config');
const { getAccordionTitle } = require('./getters');
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
	const accordionTitle = getAccordionTitle(accordion);
	if (!accordionTitle) return;
	accordionTitle.parentNode.insertBefore(accordionSwitch, accordionTitle.nextSibling);
};

module.exports = { buildAccordionSwitch };
