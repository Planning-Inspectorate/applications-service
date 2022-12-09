const primarySwitchId = 'ui-checkbox-accordion__switch';

const createPrimarySwitch = (checkboxAccordion) => {
	const primarySwitch = document.createElement('button');
	primarySwitch.type = 'button';
	primarySwitch.classList = primarySwitchId;
	setPrimarySwitchState(primarySwitch, false);
	const checkboxAccordionTitle = checkboxAccordion.querySelector('.ui-checkbox-accordion__title');
	if (!checkboxAccordionTitle) return;
	checkboxAccordionTitle.parentNode.insertBefore(primarySwitch, checkboxAccordionTitle.nextSibling);
};

const getPrimarySwitch = (section) => section.querySelector(`.${primarySwitchId}`);

const setPrimarySwitchState = (primarySwitch, isExpanded) => {
	setPrimarySwitchStateExpanded(primarySwitch, isExpanded);
	setPrimarySwitchText(primarySwitch, isPrimarySwitchStateExpanded(primarySwitch));
};

const setPrimarySwitchStateExpanded = (primarySwitch, isExpanded) =>
	(primarySwitch.ariaExpanded = isExpanded);

const setPrimarySwitchText = (primarySwitch, isExpanded) => {
	if (isExpanded) primarySwitch.innerHTML = 'Hide all sections';
	else primarySwitch.innerHTML = 'Show all sections';
};

const isPrimarySwitchStateExpanded = (primarySwitch) => primarySwitch.ariaExpanded === 'true';

module.exports = {
	createPrimarySwitch,
	getPrimarySwitch,
	isPrimarySwitchStateExpanded,
	setPrimarySwitchState
};
