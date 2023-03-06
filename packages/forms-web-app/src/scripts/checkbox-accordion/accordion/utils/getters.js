const {
	accordionId,
	accordionSectionSwitchId,
	accordionSectionsId,
	accordionSwitchClassId
} = require('./config');

const getAccordions = () => [...document.querySelectorAll(`.${accordionId}`)];
const getAccordionSectionSwitches = (accordion) => [
	...accordion.querySelectorAll(`.${accordionSectionSwitchId}`)
];
const getAccordionSections = (accordion) => accordion.querySelector(`.${accordionSectionsId}`);
const getAccordionSwitch = (accordion) => accordion.querySelector(`.${accordionSwitchClassId}`);

module.exports = {
	getAccordions,
	getAccordionSectionSwitches,
	getAccordionSections,
	getAccordionSwitch
};
