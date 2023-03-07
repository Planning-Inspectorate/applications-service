const isEveryAccordionSectionOpen = (accordionSections) =>
	accordionSections.every(
		(accordionSectionSwitch) => accordionSectionSwitch.getAttribute('open') !== null
	);

module.exports = { isEveryAccordionSectionOpen };
