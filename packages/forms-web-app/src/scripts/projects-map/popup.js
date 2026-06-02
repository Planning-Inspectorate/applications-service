'use strict';

const Popup = require('ol-ext/src/overlay/Popup.js').default;
const { POPUP_ANIMATION_DURATION_MS } = require('./constants');

/** @returns {import('ol-ext/src/overlay/Popup').default} */
function buildPopup() {
	return new Popup({
		popupClass: 'default',
		closeBox: true,
		positioning: 'auto',
		autoPan: { animation: { duration: POPUP_ANIMATION_DURATION_MS } }
	});
}

/**
 * @param {{ show: Function }} popup
 * @param {Array<{ getProperties: Function }>} features
 * @param {number[]} coordinate EPSG:27700 `[x, y]`
 * @param {import('ol/Map').default} [map] used to read viewport width for 80% popup sizing
 */
function renderPopup(popup, features, coordinate, map) {
	const mapViewport = map && typeof map.getViewport === 'function' ? map.getViewport() : null;
	const mapTarget =
		map && typeof map.getTargetElement === 'function' ? map.getTargetElement() : null;
	const mapWidth = mapViewport?.offsetWidth || mapTarget?.offsetWidth || 0;
	const popupWidth = Math.round(mapWidth * 0.8);

	const count = features.length;
	const rows = features
		.map((f) => {
			const { caseReference, projectName, stage } = f.getProperties();
			return `<tr class="cluster-popup-row">
				<td class="cluster-popup-cell-name">
					<a href="/projects/${caseReference}" class="govuk-link cluster-popup-link">${
				projectName || caseReference
			}</a>
				</td>
				<td class="cluster-popup-cell-stage">${stage || ''}</td>
			</tr>`;
		})
		.join('');

	popup.show(
		coordinate,
		`<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">${count} ${count === 1 ? 'project' : 'projects'} selected</h2>
			<table class="cluster-popup-table">${rows}</table>
		</div>`
	);

	const popupElement =
		popup.element || (typeof popup.getElement === 'function' ? popup.getElement() : null);
	if (popupElement) {
		popupElement.style.width = `${popupWidth}px`;
	}
}

module.exports = { buildPopup, renderPopup };
