const { checkboxesSectionSwitchId } = require('./config');
const { isEveryCheckboxChecked } = require('./helpers');
const { setCheckboxesSectionSwitchState } = require('./setters');

const buildCheckboxesSectionSwitch = (checkboxes, checkboxesSection) => {
	const checkboxesSectionSwitch = createCheckboxesSectionSwitch();
	setCheckboxesSectionSwitchState(checkboxesSectionSwitch, `${isEveryCheckboxChecked(checkboxes)}`);
	insertCheckboxesSectionSwitch(checkboxesSection, checkboxesSectionSwitch);
};

const createCheckboxesSectionSwitch = () => {
	const checkboxesSectionSwitch = document.createElement('button');
	checkboxesSectionSwitch.type = 'button';
	checkboxesSectionSwitch.classList = checkboxesSectionSwitchId;
	return checkboxesSectionSwitch;
};

const insertCheckboxesSectionSwitch = (checkboxesSection, checkboxesSectionSwitch) => {
	checkboxesSection.prepend(checkboxesSectionSwitch);
};

module.exports = { buildCheckboxesSectionSwitch };
