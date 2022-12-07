const { setEvents } = require('./utils/events');
const { getAllCheckboxAccordions } = require('./utils/all-checkbox-accordions');
const { createPrimarySwitch, getPrimarySwitch } = require('./utils/primary-switch');
const { getSecondarySwitches } = require('./utils/secondary-switches');

const initialiseCheckboxAccordion = () => {
	const allCheckboxAccordions = getAllCheckboxAccordions();

	if (!allCheckboxAccordions?.length) return;

	allCheckboxAccordions.forEach((checkboxAccordion) => {
		createPrimarySwitch(checkboxAccordion);
		const primarySwitch = getPrimarySwitch(checkboxAccordion);
		const secondarySwitches = getSecondarySwitches(checkboxAccordion);
		if (!primarySwitch || !secondarySwitches) return;
		setEvents(primarySwitch, secondarySwitches);
	});
};

initialiseCheckboxAccordion();
