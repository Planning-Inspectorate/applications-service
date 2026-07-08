// Projection
export const EPSG_27700_DEF =
	'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs';
export const EPSG_27700_EXTENT = [-238375.0, 0.0, 900000.0, 1376256.0];

// Map defaults
export const UK_CENTRE_EPSG27700 = [366154, 289239];
export const DEFAULT_ZOOM = 0;
export const MIN_ZOOM = 0;
export const MAX_ZOOM = 9;
export const CLUSTER_DISTANCE = 40;
export const ANIMATION_DURATION = 300;

// Tile layer (WMTS)
export const WMTS_LAYER = 'Outdoor_27700';
export const WMTS_MATRIX_SET = 'EPSG:27700';
export const WMTS_CAPABILITIES_URL =
	'https://api.os.uk/maps/raster/v1/wmts?request=GetCapabilities&service=WMTS';

// Styling
export const BOUNDARY_STROKE_COLOUR = '#FF0000';
export const BOUNDARY_FILL_COLOUR = 'rgba(255, 0, 0, 0.2)';
export const BOUNDARY_STROKE_WIDTH = 1.5;
export const CSS_VAR_CLUSTER_BG = '--cluster-bg';
export const CSS_VAR_CLUSTER_TEXT = '--cluster-text';
export const DEFAULT_CLUSTER_BG = '#d4351c';
export const DEFAULT_CLUSTER_TEXT = 'white';

// URLs
export const MARKER_ICON_URL = '/public/images/ol-map-marker.png';

// Projections
export const SOURCE_PROJECTION = 'EPSG:4326';
export const TARGET_PROJECTION = 'EPSG:27700';

// Feature property keys (as stored in GeoJSON from the server)
export const PROP_CASE_REFERENCE = 'caseReference';
export const PROP_PROJECT_NAME = 'projectName';
export const PROP_STAGE = 'stage';

// Interaction
export const CIRCLE_MAX_OBJECTS = 10;
export const FIT_PADDING = [50, 50, 50, 50];
export const FIT_EXTENT = 'fitExtent';

// Map view toggle
export const ALL_PROJECTS_MAP = 'projects-map';
export const PROJECT_MAP = 'map';
export const BOUNDARIES_MAP_VIEW = 'boundaries';
export const MARKERS_MAP_VIEW = 'markers';

// Mode
export const MULTI_POINT = 'multiPoint';
export const SINGLE_POINT = 'singlePoint';
export const GEOJSON = 'geojson';

// Geometry
export const POLYGON = 'Polygon';
export const MULTI_POLYGON = 'MultiPolygon';
