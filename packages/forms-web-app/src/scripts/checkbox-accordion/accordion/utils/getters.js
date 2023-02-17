const {
	accordionId,
	accordionSectionSwitchId,
	accordionSectionsId,
	accordionSwitchId
} = require('./config');

const getAccordions = () => [...document.querySelectorAll(`.${accordionId}`)];
const getAccordionSectionSwitches = (accordion) => [
	...accordion.querySelectorAll(`.${accordionSectionSwitchId}`)
];
const getAccordionSections = (accordion) => accordion.querySelector(`.${accordionSectionsId}`);
const getAccordionSwitch = (accordion) => accordion.querySelector(`.${accordionSwitchId}`);

module.exports = {
	getAccordions,
	getAccordionSectionSwitches,
	getAccordionSections,
	getAccordionSwitch
};
