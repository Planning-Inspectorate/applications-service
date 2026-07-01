import Popup from 'ol-ext/src/overlay/Popup.js';
import SelectCluster from 'ol-ext/src/interaction/SelectCluster.js';
import {
	ANIMATION_DURATION,
	CIRCLE_MAX_OBJECTS,
	MULTI_POLYGON,
	POLYGON,
	PROP_PROJECT_NAME,
	PROP_STAGE
} from './constants';
import { getCaseReference } from './index';

const UNKNOWN_PROJECT_LABEL = 'Unknown project';

const toValue = (value) => {
	if (typeof value !== 'string') return value || undefined;
	const trimmedValue = value.trim();
	return trimmedValue || undefined;
};

export function mapFeaturePropertiesToPopupProject(properties = {}) {
	const caseReference = toValue(properties.caseReference);
	const projectName = toValue(properties.projectName) || caseReference || UNKNOWN_PROJECT_LABEL;
	const stage = toValue(properties.stage) || '';

	return {
		caseReference,
		projectName,
		stage
	};
}

/** Creates an ol-ext Popup overlay. */
export function createPopup() {
	return new Popup({
		popupClass: 'default',
		closeBox: true,
		positioning: 'auto',
		autoPan: { animation: { duration: 250 } }
	});
}

function formatPopupText(count, popupText) {
	const text = count === 1 ? popupText.projectSelected : popupText.projectsSelected;
	return `${count} ${text}`;
}

/** Generates popup HTML from an array of project objects. */
export function renderPopupHTML(projects, popupText) {
	const count = projects.length;
	const formattedPopupText = formatPopupText(count, popupText);
	const rows = projects
		.map(({ caseReference, projectName, stage }) => {
			const projectLabel = projectName || caseReference || UNKNOWN_PROJECT_LABEL;
			const projectCell = caseReference
				? `<a href="/projects/${caseReference}" class="govuk-link cluster-popup-link">${projectLabel}</a>`
				: `<span class="cluster-popup-link">${projectLabel}</span>`;

			return `<tr class="cluster-popup-row">
				<td class="cluster-popup-cell-name">
					${projectCell}
				</td>
				<td class="cluster-popup-cell-stage">${stage || ''}</td>
			</tr>`;
		})
		.join('');

	return `<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">${formattedPopupText}</h2>
			<table class="cluster-popup-table">${rows}</table>
		</div>`;
}

/** Shows a popup at the given coordinate with project info from the features. */
export function showProjectPopup(popup, features, coordinate, popupText) {
	const projects = features.map((f) => mapFeaturePropertiesToPopupProject(f.getProperties()));

	const html = renderPopupHTML(projects, popupText);
	popup.show(coordinate, html);
}

/** Gets project properties to be displayed in popup. */
export const getBoundaryPopupProperties = (feature) => ({
	caseReference: getCaseReference(feature),
	projectName: feature.get(PROP_PROJECT_NAME),
	stage: feature.get(PROP_STAGE)
});

/** Displays popup for project boundaries. */
export function getBoundariesPopup(map, popup, popupText) {
	if (popup) {
		map.on('singleclick', (event) => {
			let featureClicked = false;

			map.forEachFeatureAtPixel(event.pixel, (feature) => {
				const geometryType = feature.getGeometry()?.getType();

				if (geometryType === POLYGON || geometryType === MULTI_POLYGON) {
					featureClicked = true;
					const popupFeature = { getProperties: () => getBoundaryPopupProperties(feature) };
					showProjectPopup(popup, [popupFeature], event.coordinate, popupText);
				}
			});

			if (!featureClicked) popup.hide();
		});

		map.getView().on('change:resolution', () => popup.hide());
	}
}

/** Displays popup for project markers. */
export function getMarkersPopup(map, layers, popup, popupText) {
	const selectCluster = new SelectCluster({
		layers: [layers[1]],
		animate: true,
		animationDuration: ANIMATION_DURATION,
		spiral: true,
		circleMaxObjects: CIRCLE_MAX_OBJECTS
	});

	map.addInteraction(selectCluster);

	selectCluster.on('select', (event) => {
		if (!event.selected.length) {
			popup.hide();
			return;
		}

		const selectedFeature = event.selected[0];
		if (selectedFeature.get('selectclusterlink')) return;

		const clusterFeatures = selectedFeature.get('features');
		if (clusterFeatures?.length) {
			showProjectPopup(
				popup,
				clusterFeatures,
				selectedFeature.getGeometry().getCoordinates(),
				popupText
			);
		}
	});
}
