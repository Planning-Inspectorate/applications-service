const { checkboxSectionSwitchClassId } = require('./config');
const { setCheckboxSectionSwitchState } = require('./setters');

const buildCheckboxSectionSwitch = (checkboxes, checkboxesSection, checkboxTranslations) => {
	const checkboxesSectionSwitch = createCheckboxSectionSwitch();
	setCheckboxSectionSwitchState(checkboxes, checkboxesSectionSwitch, checkboxTranslations);
	insertCheckboxSectionSwitch(checkboxesSection, checkboxesSectionSwitch);
};

const createCheckboxSectionSwitch = () => {
	const checkboxesSectionSwitch = document.createElement('button');
	checkboxesSectionSwitch.type = 'button';
	checkboxesSectionSwitch.setAttribute('class', checkboxSectionSwitchClassId);
	return checkboxesSectionSwitch;
};

const insertCheckboxSectionSwitch = (checkboxesSection, checkboxesSectionSwitch) => {
	checkboxesSection.prepend(checkboxesSectionSwitch);
};

module.exports = { buildCheckboxSectionSwitch };
