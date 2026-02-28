import { defaults } from 'ol/control/defaults';
import Attribution from 'ol/control/Attribution.js';

const getZoomLabel = (label, labelTip) => {
	const zoomLabel = document.createElement('span');
	zoomLabel.innerHTML = `<span aria-hidden="true">${label}</span><span class="govuk-visually-hidden">${labelTip}</span>`;

	return zoomLabel;
};

const getControls = () =>
	defaults({
		attribution: false,
		zoomOptions: {
			zoomInLabel: getZoomLabel('&plus;', 'Zoom in'),
			zoomOutLabel: getZoomLabel('&minus;', 'Zoom out')
		}
	}).extend([new Attribution({ collapsed: false, collapsible: false })]);

export { getControls };
