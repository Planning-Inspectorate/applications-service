const { checkboxesSectionSwitchClassId } = require('./config');
const { setCheckboxesSectionSwitchState } = require('./setters');

const buildCheckboxesSectionSwitch = (checkboxes, checkboxesSection) => {
	const checkboxesSectionSwitch = createCheckboxesSectionSwitch();
	setCheckboxesSectionSwitchState(checkboxes, checkboxesSectionSwitch);
	insertCheckboxesSectionSwitch(checkboxesSection, checkboxesSectionSwitch);
};

const createCheckboxesSectionSwitch = () => {
	const checkboxesSectionSwitch = document.createElement('button');
	checkboxesSectionSwitch.type = 'button';
	checkboxesSectionSwitch.setAttribute('class', checkboxesSectionSwitchClassId);
	return checkboxesSectionSwitch;
};

const insertCheckboxesSectionSwitch = (checkboxesSection, checkboxesSectionSwitch) => {
	checkboxesSection.prepend(checkboxesSectionSwitch);
};

module.exports = { buildCheckboxesSectionSwitch };
