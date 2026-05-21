/**
 * @fileoverview Unit tests for `setupEpsg27700` ({@link module:scripts/projects-map/map-setup}).
 *
 * `setupEpsg27700` registers the British National Grid (EPSG:27700) coordinate
 * reference system so that OpenLayers can render OS Maps tiles in their native
 * projection. The setup sequence is:
 *   1. Define the proj4 string for EPSG:27700.
 *   2. Register the proj4 instance with OL so it becomes aware of the CRS.
 *   3. Set the BNG bounding extent on the OL projection object.
 *
 * All three external dependencies (proj4, `ol/proj/proj4`, `ol/proj`) are mocked
 * to keep tests fast and side-effect-free.
 */
'use strict';

jest.mock('proj4/dist/proj4', () => ({ defs: jest.fn() }));
jest.mock('ol/proj/proj4.js', () => ({ register: jest.fn() }));
jest.mock('ol/proj.js', () => ({
	get: jest.fn().mockReturnValue({ setExtent: jest.fn() }),
	transform: jest.fn((coords) => coords)
}));

const { setupEpsg27700 } = require('../../../../src/scripts/projects-map/map-setup');
const {
	EPSG_27700,
	EPSG27700_PROJ4_DEF,
	EPSG27700_EXTENT
} = require('../../../../src/scripts/projects-map/constants');
const proj4 = require('proj4/dist/proj4');
const { register } = require('ol/proj/proj4.js');
const { get: getProjection } = require('ol/proj.js');

describe('setupEpsg27700', () => {
	it('registers the EPSG:27700 definition string with proj4', () => {
		setupEpsg27700();
		expect(proj4.defs).toHaveBeenCalledWith(EPSG_27700, EPSG27700_PROJ4_DEF);
	});

	it('calls register() with the proj4 instance to sync with OL', () => {
		setupEpsg27700();
		expect(register).toHaveBeenCalledWith(proj4);
	});

	it('retrieves the EPSG:27700 projection object from OL', () => {
		setupEpsg27700();
		expect(getProjection).toHaveBeenCalledWith(EPSG_27700);
	});

	it('sets the British National Grid extent on the projection', () => {
		setupEpsg27700();
		const projection = getProjection.mock.results[0].value;
		expect(projection.setExtent).toHaveBeenCalledWith(EPSG27700_EXTENT);
	});

	it('returns the configured projection object', () => {
		const result = setupEpsg27700();
		const projection = getProjection.mock.results[0].value;
		expect(result).toBe(projection);
	});

	it('the exported extent matches the expected BNG bounds', () => {
		expect(EPSG27700_EXTENT).toEqual([-238375.0, 0.0, 900000.0, 1376256.0]);
	});
});
