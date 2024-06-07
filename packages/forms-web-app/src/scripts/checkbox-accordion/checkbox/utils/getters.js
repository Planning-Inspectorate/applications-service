const { accordionId } = require('../../accordion/utils/config');
const { checkboxId, checkboxSectionId, checkboxSectionSwitchClassId } = require('./config');

const getChecboxAccordions = () => [...document.querySelectorAll(`.${accordionId}`)];

const getCheckboxSections = (checboxAccordion) => [
	...checboxAccordion.querySelectorAll(`.${checkboxSectionId}`)
];

const getCheckboxSectionSwitch = (checkboxSection) =>
	checkboxSection.querySelector(`.${checkboxSectionSwitchClassId}`);

const getCheckboxes = (checkboxSection) => [...checkboxSection.querySelectorAll(`.${checkboxId}`)];

const getCheckboxTranslations = (checboxAccordion) => {
	const { clearFilters, selectAllFilters } = JSON.parse(checboxAccordion.dataset.translations);

	return {
		clearFilters,
		selectAllFilters
	};
};

module.exports = {
	getChecboxAccordions,
	getCheckboxSections,
	getCheckboxSectionSwitch,
	getCheckboxes,
	getCheckboxTranslations
};
