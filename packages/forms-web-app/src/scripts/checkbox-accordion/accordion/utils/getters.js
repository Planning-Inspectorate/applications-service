const {
	accordionId,
	accordionSectionSwitchId,
	accordionSwitchId,
	accordionTitle
} = require('./config');

const getAccordions = () => [...document.querySelectorAll(`.${accordionId}`)];
const getAccordionSectionSwitches = (accordion) => [
	...accordion.querySelectorAll(`.${accordionSectionSwitchId}`)
];
const getAccordionSwitch = (accordion) => accordion.querySelector(`.${accordionSwitchId}`);
const getAccordionTitle = (accordion) => accordion.querySelector(`.${accordionTitle}`);

module.exports = {
	getAccordions,
	getAccordionSectionSwitches,
	getAccordionSwitch,
	getAccordionTitle
};
