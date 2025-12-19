import L from 'leaflet';

/**
 * Stage to color mapping for boundary polygons
 */
const STAGE_BOUNDARY_COLORS = {
	'Pre-application': '#00703c',
	'Pre Application': '#00703c',
	Acceptance: '#5694ca',
	'Pre-examination': '#1d70b8',
	Examination: '#4c2c92',
	Recommendation: '#ffdd00',
	Decision: '#d53880',
	Decided: '#5694ca',
	'Post-decision': '#505a5f',
	Withdrawn: '#f47738',
	Unknown: '#505a5f'
};

/**
 * Gets the color for a project stage
 * @param {string} stage - Project stage name
 * @returns {string} Hex color code
 */
function getStageColor(stage) {
	return STAGE_BOUNDARY_COLORS[stage] || STAGE_BOUNDARY_COLORS.Unknown;
}

/**
 * Creates popup content for a boundary feature
 * @param {Object} properties - Feature properties
 * @returns {string} HTML content for popup
 */
function createBoundaryPopupContent(properties) {
	const name = properties.projectName || properties.name || 'Unknown Project';
	const reference = properties.caseReference || properties.reference || '';
	const stage = properties.stage || 'Unknown';
	const region = properties.region || '';

	return `
		<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">Project boundary</h2>
			<table class="cluster-popup-table">
				<tr class="cluster-popup-row">
					<td class="cluster-popup-cell-name">
						<a href="/projects/${reference}" class="cluster-popup-link">${name}</a>
					</td>
					<td class="cluster-popup-cell-stage">${stage}</td>
				</tr>
				${
					region
						? `
				<tr class="cluster-popup-row">
					<td>Region</td>
					<td>${region}</td>
				</tr>
				`
						: ''
				}
			</table>
		</div>
	`;
}

/**
 * Style function for GeoJSON boundaries
 * @param {Object} feature - GeoJSON feature
 * @returns {Object} Leaflet style options
 */
function styleBoundary(feature) {
	const stage =
		feature.properties?.['infrastructure-project-decision'] ||
		feature.properties?.stage ||
		'Unknown';
	const color = getStageColor(stage);

	return {
		color: color,
		weight: 2,
		opacity: 0.8,
		fillColor: color,
		fillOpacity: 0.2
	};
}

/**
 * Highlight style for hover
 * @param {Object} feature - GeoJSON feature
 * @returns {Object} Leaflet style options
 */
function highlightStyle(feature) {
	const stage =
		feature.properties?.['infrastructure-project-decision'] ||
		feature.properties?.stage ||
		'Unknown';
	const color = getStageColor(stage);

	return {
		color: color,
		weight: 4,
		opacity: 1,
		fillColor: color,
		fillOpacity: 0.4
	};
}

/**
 * Loads project boundaries from GeoJSON API endpoint
 * proj4leaflet handles WGS84 to EPSG:27700 transformation automatically
 * @param {L.Map} map - Leaflet map instance
 * @param {string} geojsonUrl - URL to fetch GeoJSON from
 * @returns {Promise<L.GeoJSON|null>} The GeoJSON layer or null on error
 */
export async function loadProjectBoundaries(map, geojsonUrl) {
	if (!geojsonUrl) {
		console.log('No GeoJSON URL provided, skipping boundary loading');
		return null;
	}

	try {
		console.log('Loading project boundaries from:', geojsonUrl);
		const response = await fetch(geojsonUrl);

		if (!response.ok) {
			throw new Error(`HTTP error fetching boundaries: ${response.status}`);
		}

		const geojsonData = await response.json();

		if (!geojsonData?.features?.length) {
			console.warn('No boundary features found in GeoJSON');
			return null;
		}

		console.log(`Adding ${geojsonData.features.length} boundary features to map`);

		const boundaryLayer = L.geoJSON(geojsonData, {
			style: styleBoundary,
			onEachFeature: (feature, layer) => {
				layer.bindPopup(createBoundaryPopupContent(feature.properties), {
					maxWidth: 320,
					minWidth: 280,
					closeButton: true,
					autoPan: true,
					className: 'cluster-popup'
				});

				layer.on({
					mouseover: (e) => {
						const targetLayer = e.target;
						targetLayer.setStyle(highlightStyle(feature));
						targetLayer.bringToFront();
					},
					mouseout: (e) => {
						boundaryLayer.resetStyle(e.target);
					},
					click: (e) => {
						console.log('=== Boundary Feature Clicked ===');
						console.log('All properties:', feature.properties);
						console.log('Geometry type:', feature.geometry?.type);
						console.log('Feature keys:', Object.keys(feature));
						console.log('Property keys:', Object.keys(feature.properties || {}));
						map.fitBounds(e.target.getBounds());
					}
				});
			}
		});

		boundaryLayer.addTo(map);
		console.log(`Loaded ${geojsonData.features.length} project boundaries`);

		return boundaryLayer;
	} catch (error) {
		console.error('Error loading project boundaries:', error);
		return null;
	}
}
