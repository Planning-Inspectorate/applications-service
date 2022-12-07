const getSecondarySwitches = (section) => [
	...section.querySelectorAll('.ui-checkbox-accordion__section-switch')
];

const isEverySecondarySwitchChecked = (secondarySwitches) =>
	secondarySwitches.every((secondarySwitch) => secondarySwitch.checked);

module.exports = { getSecondarySwitches, isEverySecondarySwitchChecked };
