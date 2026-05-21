'use strict';

const Popup = require('ol-ext/src/overlay/Popup.js').default;
const { POPUP_ANIMATION_DURATION_MS } = require('./constants');

/**
 * Creates an ol-ext `Popup` overlay instance with standard project-map settings.
 *
 * @returns {import('ol-ext/src/overlay/Popup').default}
 */
function buildPopup() {
	return new Popup({
		popupClass: 'default',
		closeBox: true,
		positioning: 'auto',
		autoPan: { animation: { duration: POPUP_ANIMATION_DURATION_MS } }
	});
}

/**
 * Renders a list of projects into the cluster popup at the given map coordinate.
 *
 * The popup root element width is set to 80% of the map viewport width so
 * content wraps within the available space rather than forcing the popup wider.
 *
 * Each feature must expose `caseReference`, `projectName`, and `stage` via
 * `getProperties()`. `projectName` is used as the link label when available;
 * `caseReference` is used as fallback.
 *
 * @param {{ show: Function }} popup ol-ext Popup instance
 * @param {Array<{ getProperties: Function }>} features OL features in the selected cluster
 * @param {number[]} coordinate EPSG:27700 coordinate `[x, y]`
 * @param {import('ol/Map').default} map OL Map instance — used to read viewport width
 */
function renderPopup(popup, features, coordinate, map) {
	const mapViewport = typeof map.getViewport === 'function' ? map.getViewport() : null;
	const mapTarget = map.getTargetElement();
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
