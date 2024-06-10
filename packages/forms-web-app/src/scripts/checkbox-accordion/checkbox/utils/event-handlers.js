const { setCheckboxSectionSwitchState, toggleAccordionSwitchState } = require('./setters');

const onCheckboxChange = (checkboxes, checkboxSectionSwitch, checkboxTranslations) => {
	setCheckboxSectionSwitchState(checkboxes, checkboxSectionSwitch, checkboxTranslations);
};

const onCheckboxSectionSwitchClick = (checkboxes, checkboxSectionSwitch, checkboxTranslations) =>
	toggleAccordionSwitchState(checkboxes, checkboxSectionSwitch, checkboxTranslations);

module.exports = { onCheckboxChange, onCheckboxSectionSwitchClick };
