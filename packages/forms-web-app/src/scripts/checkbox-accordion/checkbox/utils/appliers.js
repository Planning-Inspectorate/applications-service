const { onCheckboxChange, onCheckboxSectionSwitchClick } = require('./event-handlers');

const applyCheckboxEvent = (checkboxes, checkboxSectionSwitch, checkboxTranslations) =>
	checkboxes.forEach((checkbox) =>
		checkbox.addEventListener('change', () =>
			onCheckboxChange(checkboxes, checkboxSectionSwitch, checkboxTranslations)
		)
	);

const applyCheckboxSectionSwitchEvent = (checkboxes, checkboxSectionSwitch, checkboxTranslations) =>
	checkboxSectionSwitch.addEventListener('click', () =>
		onCheckboxSectionSwitchClick(checkboxes, checkboxSectionSwitch, checkboxTranslations)
	);

module.exports = {
	applyCheckboxEvent,
	applyCheckboxSectionSwitchEvent
};
