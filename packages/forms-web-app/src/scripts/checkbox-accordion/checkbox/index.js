const { applyCheckboxEvent, applyCheckboxSectionSwitchEvent } = require('./utils/appliers');
const { buildCheckboxSectionSwitch } = require('./utils/builders');
const {
	getChecboxAccordions,
	getCheckboxSections,
	getCheckboxSectionSwitch,
	getCheckboxes,
	getCheckboxTranslations
} = require('./utils/getters');

const initiateCheckboxes = () => {
	const checboxAccordions = getChecboxAccordions();

	if (!checboxAccordions.length) return;

	checboxAccordions.forEach((checboxAccordion) => {
		const checkboxSections = getCheckboxSections(checboxAccordion);

		if (!checkboxSections.length) return;

		const checkboxTranslations = getCheckboxTranslations(checboxAccordion);

		checkboxSections.forEach((checkboxSection) => {
			const checkboxes = getCheckboxes(checkboxSection);

			if (!checkboxes.length) return;

			buildCheckboxSectionSwitch(checkboxes, checkboxSection, checkboxTranslations);

			const checkboxSectionSwitch = getCheckboxSectionSwitch(checkboxSection);

			if (!checkboxSectionSwitch) return;

			applyCheckboxEvent(checkboxes, checkboxSectionSwitch, checkboxTranslations);
			applyCheckboxSectionSwitchEvent(checkboxes, checkboxSectionSwitch, checkboxTranslations);
		});
	});
};

module.exports = { initiateCheckboxes };
