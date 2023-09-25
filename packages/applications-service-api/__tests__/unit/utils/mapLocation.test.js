const {
	addMapZoomLvlAndLongLat,
	mapZoomLevel,
	mapNorthingEastingToLongLat,
	mapLongLat
} = require('../../../src/utils/mapLocation');

describe('map and location utils', () => {
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

	describe('mapLongLat', () => {
		it.each([
			[undefined, []],
			['53.620079146110655,-0.7028315466694124', ['-0.7028315466694124', '53.620079146110655']]
		])('maps lat/long string to long/lat array', (input, expectedOutput) => {
			expect(mapLongLat(input)).toEqual(expectedOutput);
		});
	});

	describe('mapZoomLevel', () => {
		it.each([
			['BOROUGH', 8],
			['borough', 8],
			['COUNTRY', 5],
			['JUNCTION', 12],
			['unknown', 14],
			[undefined, 14]
		])('maps lat/long string to long/lat array', (input, expectedOutput) => {
			expect(mapZoomLevel(input)).toEqual(expectedOutput);
		});
	});

	describe('mapNorthingEastingToLongLat', () => {
		it('maps northing/easting to long/lat', () => {
			expect(mapNorthingEastingToLongLat(414508, 485899)).toEqual([
				'-0.7028315466694124',
				'53.620079146110655'
			]);
		});
	});
});
