import {
	EPSG_27700_DEF,
	EPSG_27700_EXTENT,
	UK_CENTRE_EPSG27700,
	DEFAULT_ZOOM,
	MIN_ZOOM,
	MAX_ZOOM,
	CLUSTER_DISTANCE,
	ANIMATION_DURATION,
	WMTS_LAYER,
	WMTS_MATRIX_SET,
	WMTS_CAPABILITIES_URL,
	BOUNDARY_STROKE_COLOUR,
	BOUNDARY_FILL_COLOUR,
	BOUNDARY_STROKE_WIDTH,
	CSS_VAR_CLUSTER_BG,
	CSS_VAR_CLUSTER_TEXT,
	DEFAULT_CLUSTER_BG,
	DEFAULT_CLUSTER_TEXT,
	MARKER_ICON_URL
} from '../constants';

describe('scripts/projects-map/constants', () => {
	describe('Projection constants', () => {
		it('should define EPSG_27700_DEF as a string', () => {
			expect(typeof EPSG_27700_DEF).toBe('string');
			expect(EPSG_27700_DEF).toBeDefined();
		});

		it('should define EPSG_27700_EXTENT as an array of numbers', () => {
			expect(Array.isArray(EPSG_27700_EXTENT)).toBe(true);
			expect(EPSG_27700_EXTENT).toHaveLength(4);
			EPSG_27700_EXTENT.forEach((val) => {
				expect(typeof val).toBe('number');
			});
		});
	});

	describe('Map default constants', () => {
		it('should define UK_CENTRE_EPSG27700 as an array of numbers', () => {
			expect(Array.isArray(UK_CENTRE_EPSG27700)).toBe(true);
			expect(UK_CENTRE_EPSG27700).toHaveLength(2);
			UK_CENTRE_EPSG27700.forEach((val) => {
				expect(typeof val).toBe('number');
			});
		});

		it('should define DEFAULT_ZOOM as a number', () => {
			expect(typeof DEFAULT_ZOOM).toBe('number');
		});

		it('should define MIN_ZOOM as a number', () => {
			expect(typeof MIN_ZOOM).toBe('number');
		});

		it('should define MAX_ZOOM as a number', () => {
			expect(typeof MAX_ZOOM).toBe('number');
		});

		it('should define CLUSTER_DISTANCE as a number', () => {
			expect(typeof CLUSTER_DISTANCE).toBe('number');
		});

		it('should define ANIMATION_DURATION as a number', () => {
			expect(typeof ANIMATION_DURATION).toBe('number');
		});
	});

	describe('Tile layer (WMTS) constants', () => {
		it('should define WMTS_LAYER as a string', () => {
			expect(typeof WMTS_LAYER).toBe('string');
			expect(WMTS_LAYER).toBeDefined();
		});

		it('should define WMTS_MATRIX_SET as a string', () => {
			expect(typeof WMTS_MATRIX_SET).toBe('string');
			expect(WMTS_MATRIX_SET).toBeDefined();
		});

		it('should define WMTS_CAPABILITIES_URL as a string', () => {
			expect(typeof WMTS_CAPABILITIES_URL).toBe('string');
			expect(WMTS_CAPABILITIES_URL).toBeDefined();
		});
	});

	describe('Styling constants', () => {
		it('should define BOUNDARY_STROKE_COLOUR as a string', () => {
			expect(typeof BOUNDARY_STROKE_COLOUR).toBe('string');
			expect(BOUNDARY_STROKE_COLOUR).toBeDefined();
		});

		it('should define BOUNDARY_FILL_COLOUR as a string', () => {
			expect(typeof BOUNDARY_FILL_COLOUR).toBe('string');
			expect(BOUNDARY_FILL_COLOUR).toBeDefined();
		});

		it('should define BOUNDARY_STROKE_WIDTH as a number', () => {
			expect(typeof BOUNDARY_STROKE_WIDTH).toBe('number');
		});

		it('should define CSS_VAR_CLUSTER_BG as a string', () => {
			expect(typeof CSS_VAR_CLUSTER_BG).toBe('string');
			expect(CSS_VAR_CLUSTER_BG).toBeDefined();
		});

		it('should define CSS_VAR_CLUSTER_TEXT as a string', () => {
			expect(typeof CSS_VAR_CLUSTER_TEXT).toBe('string');
			expect(CSS_VAR_CLUSTER_TEXT).toBeDefined();
		});

		it('should define DEFAULT_CLUSTER_BG as a string', () => {
			expect(typeof DEFAULT_CLUSTER_BG).toBe('string');
			expect(DEFAULT_CLUSTER_BG).toBeDefined();
		});

		it('should define DEFAULT_CLUSTER_TEXT as a string', () => {
			expect(typeof DEFAULT_CLUSTER_TEXT).toBe('string');
			expect(DEFAULT_CLUSTER_TEXT).toBeDefined();
		});
	});

	describe('URL constants', () => {
		it('should define MARKER_ICON_URL as a string', () => {
			expect(typeof MARKER_ICON_URL).toBe('string');
			expect(MARKER_ICON_URL).toBeDefined();
		});
	});
});
