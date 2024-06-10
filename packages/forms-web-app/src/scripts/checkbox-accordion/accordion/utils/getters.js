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

const getAccordionTranslations = (accordion) => {
	const { hideAllSections, showAllSections } = JSON.parse(accordion.dataset.translations);

	return {
		hideAllSections,
		showAllSections
	};
};

module.exports = {
	getAccordions,
	getaccordionSections,
	getAccordionSections,
	getAccordionSwitch,
	getAccordionTranslations
};
