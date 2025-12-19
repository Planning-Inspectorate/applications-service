import L from 'leaflet';
import 'leaflet.markercluster';
import { createMarkerIcon, createPopupContent } from './marker-factory.js';

const DEBUG = process.env.NODE_ENV !== 'production';

/**
 * Creates a marker cluster group with custom styling
 * @returns {L.MarkerClusterGroup} Configured marker cluster group
 */
function createMarkerClusterGroup() {
	return L.markerClusterGroup({
		showCoverageOnHover: false,
		maxClusterRadius: 50,
		spiderfyOnMaxZoom: true,
		disableClusteringAtZoom: 8,
		iconCreateFunction: (cluster) => {
			const count = cluster.getChildCount();
			let size = 'small';
			if (count >= 10) size = 'medium';
			if (count >= 50) size = 'large';

			return L.divIcon({
				html: `<div><span>${count}</span></div>`,
				className: `marker-cluster marker-cluster-${size}`,
				iconSize: L.point(40, 40)
			});
		}
	});
}

/**
 * Creates a single marker for one project
 * @param {Object} feature - GeoJSON feature
 * @returns {L.Marker} Leaflet marker
 */
function createSingleMarker(feature) {
	const [lng, lat] = feature.geometry.coordinates;
	const stage = feature.properties.stage || 'Unknown';

	const marker = L.marker([lat, lng], {
		icon: createMarkerIcon(stage)
	});

	marker.bindPopup(createPopupContent(feature.properties), {
		maxWidth: 320,
		minWidth: 280,
		closeButton: true,
		autoPan: true,
		className: 'cluster-popup'
	});

	return marker;
}

/**
 * Creates markers with leaflet.markercluster for proper zoom-based clustering
 * @param {L.Map} map - Leaflet map instance
 * @param {Array} features - Array of valid GeoJSON features
 * @returns {L.MarkerClusterGroup} The marker cluster group added to the map
 */
export function createMarkersWithClustering(map, features) {
	const clusterGroup = createMarkerClusterGroup();

	features.forEach((feature) => {
		const marker = createSingleMarker(feature);
		clusterGroup.addLayer(marker);
	});

	map.addLayer(clusterGroup);

	if (DEBUG) console.log(`Created ${features.length} markers with clustering`);

	return clusterGroup;
}
