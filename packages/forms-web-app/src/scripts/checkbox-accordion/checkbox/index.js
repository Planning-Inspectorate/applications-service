const { applyCheckboxEvent, applyCheckboxesSectionSwitchEvent } = require('./utils/appliers');
const { buildCheckboxesSectionSwitch } = require('./utils/builders');
const {
	getCheckboxesSections,
	getCheckboxes,
	getCheckboxesSectionSwitch
} = require('./utils/getters');

const initiateCheckboxes = () => {
	const checkboxesSections = getCheckboxesSections();
	if (!checkboxesSections.length) return;

	checkboxesSections.forEach((checkboxesSection) => {
		const checkboxes = getCheckboxes(checkboxesSection);

		if (!checkboxes.length) return;

		buildCheckboxesSectionSwitch(checkboxes, checkboxesSection);

		const checkboxesSectionSwitch = getCheckboxesSectionSwitch(checkboxesSection);

		if (!checkboxesSectionSwitch) return;

		applyCheckboxEvent(checkboxes, checkboxesSectionSwitch);
		applyCheckboxesSectionSwitchEvent(checkboxes, checkboxesSectionSwitch);
	});
};

module.exports = { initiateCheckboxes };
