const { setPrimarySwitchState, isPrimarySwitchStateExpanded } = require('./primary-switch');
const { isEverySecondarySwitchChecked } = require('./secondary-switches');

const setPrimarySwitchEvent = (primarySwitch, secondarySwitches) => {
	primarySwitch.addEventListener('click', () => {
		setPrimarySwitchState(primarySwitch, !isPrimarySwitchStateExpanded(primarySwitch));

		secondarySwitches.forEach(
			(secondarySwitch) => (secondarySwitch.checked = isPrimarySwitchStateExpanded(primarySwitch))
		);
	});
};

const setSecondarySwitchesEvent = (primarySwitch, secondarySwitches) => {
	secondarySwitches.forEach((sectionSwitch) => {
		sectionSwitch.addEventListener('change', function () {
			if (this.checked && isEverySecondarySwitchChecked(secondarySwitches))
				setPrimarySwitchState(primarySwitch, true);
			else if (!this.checked) setPrimarySwitchState(primarySwitch, false);
		});
	});
};

const setEvents = (primarySwitch, secondarySwitches) => {
	setPrimarySwitchEvent(primarySwitch, secondarySwitches);
	setSecondarySwitchesEvent(primarySwitch, secondarySwitches);
};

module.exports = { setEvents };
