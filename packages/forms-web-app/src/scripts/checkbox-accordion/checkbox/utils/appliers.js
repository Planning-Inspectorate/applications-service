const { onCheckboxChange, onCheckboxesSectionSwitchClick } = require('./event-handlers');

const applyCheckboxEvent = (checkboxes, checkboxesSectionSwitch) =>
	checkboxes.forEach((checkbox) =>
		checkbox.addEventListener('change', () => onCheckboxChange(checkboxes, checkboxesSectionSwitch))
	);

const applyCheckboxesSectionSwitchEvent = (checkboxes, checkboxesSectionSwitch) =>
	checkboxesSectionSwitch.addEventListener('click', () =>
		onCheckboxesSectionSwitchClick(checkboxes, checkboxesSectionSwitch)
	);

module.exports = {
	applyCheckboxEvent,
	applyCheckboxesSectionSwitchEvent
};
