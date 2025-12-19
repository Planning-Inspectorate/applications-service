import L from 'leaflet';

const DEBUG = process.env.NODE_ENV !== 'production';

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
 * Gets the stage from feature properties
 * @param {Object} feature - GeoJSON feature
 * @returns {string} Stage name
 */
function getFeatureStage(feature) {
	return (
		feature.properties?.['infrastructure-project-decision'] ||
		feature.properties?.stage ||
		'Unknown'
	);
}

/**
 * Builds a Leaflet style object for a boundary feature
 * @param {Object} feature - GeoJSON feature
 * @param {Object} styleOptions - Style options (weight, opacity, fillOpacity)
 * @returns {Object} Leaflet style options
 */
function buildBoundaryStyle(feature, { weight, opacity, fillOpacity }) {
	const stage = getFeatureStage(feature);
	const color = getStageColor(stage);

	return {
		color,
		weight,
		opacity,
		fillColor: color,
		fillOpacity
	};
}

/**
 * Style function for GeoJSON boundaries
 * @param {Object} feature - GeoJSON feature
 * @returns {Object} Leaflet style options
 */
function styleBoundary(feature) {
	return buildBoundaryStyle(feature, {
		weight: 2,
		opacity: 0.8,
		fillOpacity: 0.2
	});
}

/**
 * Highlight style for hover
 * @param {Object} feature - GeoJSON feature
 * @returns {Object} Leaflet style options
 */
function highlightStyle(feature) {
	return buildBoundaryStyle(feature, {
		weight: 4,
		opacity: 1,
		fillOpacity: 0.4
	});
}

/**
 * Extracts stage from filename pattern like "EN010147_Acceptance.zip"
 * @param {string} filename - The filename to parse
 * @returns {string|null} The extracted stage or null
 */
function extractStageFromFilename(filename) {
	if (!filename) return null;
	const match = filename.match(/_([A-Za-z]+)(?:_[A-Za-z]+)?\.zip$/);
	return match ? match[1] : null;
}

/**
 * Creates popup content for a boundary feature
 * Handles unenriched data where projectName is actually a filename
 * @param {Object} properties - Feature properties
 * @returns {string} HTML content for popup
 */
function createBoundaryPopupContent(properties) {
	const reference = properties.caseReference || properties.reference || '';
	const region = properties.region || '';

	const isEnriched = properties.stage && !properties.projectName?.endsWith('.zip');
	let displayName;
	let stage;

	if (isEnriched) {
		displayName = properties.projectName || properties.name || reference;
		stage = properties.stage;
	} else {
		displayName = reference;
		stage = extractStageFromFilename(properties.projectName) || 'Unknown';
	}

	return `
		<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">Project boundary</h2>
			<table class="cluster-popup-table">
				<tr class="cluster-popup-row">
					<td class="cluster-popup-cell-name">${displayName}</td>
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
 * Loads project boundaries from GeoJSON API endpoint
 * proj4leaflet handles WGS84 to EPSG:27700 transformation automatically
 * @param {L.Map} map - Leaflet map instance
 * @param {string} geojsonUrl - URL to fetch GeoJSON from
 * @returns {Promise<L.GeoJSON|null>} The GeoJSON layer or null on error
 */
export async function loadProjectBoundaries(map, geojsonUrl) {
	if (!geojsonUrl) {
		if (DEBUG) console.log('No GeoJSON URL provided, skipping boundary loading');
		return null;
	}

	try {
		if (DEBUG) console.log('Loading project boundaries from:', geojsonUrl);
		const response = await fetch(geojsonUrl);

		if (!response.ok) {
			throw new Error(`HTTP error fetching boundaries: ${response.status}`);
		}

		const geojsonData = await response.json();

		if (!geojsonData?.features?.length) {
			console.warn('No boundary features found in GeoJSON');
			return null;
		}

		if (DEBUG) console.log(`Adding ${geojsonData.features.length} boundary features to map`);

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
						if (DEBUG) {
							console.log('Boundary clicked:', feature.properties?.caseReference);
						}
						map.fitBounds(e.target.getBounds());
					}
				});
			}
		});

		boundaryLayer.addTo(map);
		if (DEBUG) console.log(`Loaded ${geojsonData.features.length} project boundaries`);

		return boundaryLayer;
	} catch (error) {
		console.error('Error loading project boundaries:', error);
		return null;
	}
}
