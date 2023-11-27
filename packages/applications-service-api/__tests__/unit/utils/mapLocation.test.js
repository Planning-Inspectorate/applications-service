const {
	mapZoomLevel,
	mapNorthingEastingToLongLat,
	mapLongLat
} = require('../../../src/utils/mapLocation');

describe('map and location utils', () => {
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
			['BOROUGH', 3],
			['borough', 3],
			['COUNTRY', 0],
			['JUNCTION', 7],
			['unknown', 0],
			[undefined, 0]
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
