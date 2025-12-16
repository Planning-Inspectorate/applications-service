import L from 'leaflet';
import { createMarkerIcon, createPopupContent } from './marker-factory.js';

/** @typedef {Object} MarkerGroup - Group of markers at same location
 * @property {Coordinates} coordinates - Shared coordinates
 * @property {GeoJSONFeature[]} features - Features at this location
 */

/**
 * Groups features by coordinates to detect overlapping markers
 * @param {GeoJSONFeature[]} features - Array of GeoJSON features
 * @returns {MarkerGroup[]} Array of marker groups
 */
export function groupFeaturesByLocation(features) {
	/** @type {Map<string, GeoJSONFeature[]>} */
	const locationMap = new Map();

	features.forEach((feature) => {
		const [lng, lat] = feature.geometry.coordinates;
		// Use exact coordinates as key to detect identical locations
		const key = `${lng},${lat}`;

		if (!locationMap.has(key)) {
			locationMap.set(key, []);
		}
		locationMap.get(key).push(feature);
		console.log(`Adding ${feature.properties.projectName} to location ${key}`);
	});

	const groups = Array.from(locationMap.entries()).map(([, groupFeatures]) => ({
		coordinates: groupFeatures[0].geometry.coordinates,
		features: groupFeatures
	}));

	const clusteredGroups = groups.filter((g) => g.features.length > 1);
	console.log(`Found ${clusteredGroups.length} clustered locations:`, clusteredGroups);

	return groups;
}

/**
 * Creates a single marker for one project
 * @param {L.Map} map - Leaflet map instance
 * @param {GeoJSONFeature} feature - Single feature
 */
function createSingleMarker(map, feature) {
	const [lng, lat] = feature.geometry.coordinates;
	const stage = feature.properties.stage || 'Unknown';

	/** @type {L.Marker} */
	const marker = L.marker([lat, lng], {
		icon: createMarkerIcon(stage)
	}).addTo(map);

	marker.bindPopup(createPopupContent(feature.properties), {
		maxWidth: 320,
		minWidth: 280,
		closeButton: true,
		autoPan: true,
		className: 'cluster-popup'
	});
}

/**
 * Creates a cluster marker for multiple projects at same location
 * @param {L.Map} map - Leaflet map instance
 * @param {MarkerGroup} group - Group of features at same location
 */
function createClusterMarker(map, group) {
	const [lng, lat] = group.coordinates;
	const count = group.features.length;

	console.log(
		`Creating cluster marker for ${count} projects at [${lat}, ${lng}]:`,
		group.features.map((f) => f.properties.projectName)
	);

	/** @type {L.DivIcon} */
	const clusterIcon = L.divIcon({
		className: 'marker-cluster',
		html: `<div><span>${count}</span></div>`,
		iconSize: [40, 40],
		iconAnchor: [20, 20]
	});

	/** @type {L.Marker} */
	const marker = L.marker([lat, lng], {
		icon: clusterIcon
	}).addTo(map);

	// Create popup content with CSS classes
	/** @type {string} */
	const popupContent = `
		<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">${count} projects selected</h2>
			<table class="cluster-popup-table">
				${group.features
					.map(
						(feature) => `
					<tr class="cluster-popup-row">
						<td class="cluster-popup-cell-name">
							<a href="/projects/${feature.properties.caseRef}" class="cluster-popup-link">${feature.properties.projectName}</a>
						</td>
						<td class="cluster-popup-cell-stage">
							${feature.properties.stage}
						</td>
					</tr>
				`
					)
					.join('')}
			</table>
		</div>
	`;

	marker.bindPopup(popupContent, {
		maxWidth: 320,
		minWidth: 280,
		closeButton: true,
		autoPan: true,
		className: 'cluster-popup'
	});
}

/**
 * Creates markers with clustering for overlapping locations
 * @param {L.Map} map - Leaflet map instance
 * @param {GeoJSONFeature[]} features - Array of valid features
 */
export function createMarkersWithClustering(map, features) {
	const markerGroups = groupFeaturesByLocation(features);

	markerGroups.forEach((group) => {
		if (group.features.length === 1) {
			createSingleMarker(map, group.features[0]);
		} else {
			createClusterMarker(map, group);
		}
	});

	console.log(
		`Created ${markerGroups.length} markers (${
			markerGroups.filter((g) => g.features.length > 1).length
		} clusters)`
	);
}
