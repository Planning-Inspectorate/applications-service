'use strict';

const proj4 = require('proj4/dist/proj4');
const { register } = require('ol/proj/proj4.js');
const { get: getProjection } = require('ol/proj.js');
const { EPSG_27700, EPSG27700_PROJ4_DEF, EPSG27700_EXTENT } = require('./constants');

/**
 * Registers the EPSG:27700 (British National Grid) projection with proj4 and OL,
 * then sets its valid extent and returns the configured OL projection object.
 *
 * @returns {import('ol/proj/Projection').default}
 */
function setupEpsg27700() {
	proj4.defs(EPSG_27700, EPSG27700_PROJ4_DEF);
	register(proj4);
	const projection = getProjection(EPSG_27700);
	projection.setExtent(EPSG27700_EXTENT);
	return projection;
}

module.exports = { setupEpsg27700 };
