const { defaults } = require('ol/control/defaults');
const Attribution = require('ol/control/Attribution').default;

const getZoomLabel = (label, labelTip) => {
	const zoomLabel = document.createElement('span');
	zoomLabel.innerHTML = `<span aria-hidden="true">${label}</span><span class="govuk-visually-hidden">${labelTip}</span>`;

	return zoomLabel;
};

const getControls = () => {
	const defaultControls = defaults({
		zoomOptions: {
			zoomInLabel: getZoomLabel('&plus;', 'Zoom in'),
			zoomOutLabel: getZoomLabel('&minus;', 'Zoom out')
		},
		attribution: false // Disable default hidden attribution
	});

	// Add explicit Attribution control that is visible by default
	defaultControls.push(
		new Attribution({
			collapsible: false,
			collapsed: false // Show by default
		})
	);

	return defaultControls;
};

module.exports = { getControls };
