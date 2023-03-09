const {
	accordionId,
	accordionSectionId,
	accordionSectionsId,
	accordionSwitchClassId
} = require('./config');

const getAccordions = () => [...document.querySelectorAll(`.${accordionId}`)];
const getaccordionSections = (accordion) => [
	...accordion.querySelectorAll(`.${accordionSectionId}`)
];
const getAccordionSections = (accordion) => accordion.querySelector(`.${accordionSectionsId}`);
const getAccordionSwitch = (accordion) => accordion.querySelector(`.${accordionSwitchClassId}`);

module.exports = {
	getAccordions,
	getaccordionSections,
	getAccordionSections,
	getAccordionSwitch
};
