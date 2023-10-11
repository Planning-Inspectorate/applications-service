import { defaults } from 'ol/control/defaults';

const getZoomLabel = (label, labelTip) => {
	const zoomLabel = document.createElement('span');
	zoomLabel.innerHTML = `<span aria-hidden="true">${label}</span><span class="govuk-visually-hidden">${labelTip}</span>`;

	return zoomLabel;
};

const getControls = () =>
	defaults({
		zoomOptions: {
			zoomInLabel: getZoomLabel('&plus;', 'Zoom in'),
			zoomOutLabel: getZoomLabel('&minus;', 'Zoom out')
		}
	});

export { getControls };
