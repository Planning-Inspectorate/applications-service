const { addMapZoomLvlAndLongLat } = require('../../../src/utils/add-map-zoom-and-longlat');

describe('addMapZoomLvlAndLongLat', () => {
	it.each([
		[
			{ LatLong: '53.620, -0.702', MapZoomLevel: 'Region' },
			{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 6 }
		],
		[
			{ LatLong: '   53.620   , -0.702   ', MapZoomLevel: 'Region' },
			{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 6 }
		],
		[{ LatLong: '53.620, -0.702' }, { LongLat: ['-0.702', '53.620'], MapZoomLevel: 5 }],
		[{ MapZoomLevel: 'Region' }, { MapZoomLevel: 6 }]
	])('adds LongLat and MapZoomLevel', (input, expectedOutput) => {
		expect(addMapZoomLvlAndLongLat(input)).toEqual(expectedOutput);
	});
});
