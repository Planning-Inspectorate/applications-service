const { getUKMapBounds } = require('./map-bounds');

describe('map-bounds utility', () => {
	describe('#getUKMapBounds', () => {
		let bounds;

		beforeEach(() => {
			bounds = getUKMapBounds();
		});

		it('should return an object with center and maxBounds properties', () => {
			expect(bounds).toHaveProperty('center');
			expect(bounds).toHaveProperty('maxBounds');
		});

		describe('center', () => {
			it('should return a valid [lat, lng] coordinate within the UK', () => {
				const [lat, lng] = bounds.center;

				expect(Array.isArray(bounds.center)).toBe(true);
				expect(bounds.center).toHaveLength(2);
				expect(typeof lat).toBe('number');
				expect(typeof lng).toBe('number');

				// Verify coordinates are within UK bounds
				expect(lat).toBeGreaterThan(49); // Southern tip of UK
				expect(lat).toBeLessThan(61); // Northern tip of Scotland
				expect(lng).toBeGreaterThan(-8); // Western edge
				expect(lng).toBeLessThan(2); // Eastern edge
			});
		});

		describe('maxBounds', () => {
			it('should return valid southwest and northeast corner coordinates', () => {
				const [southwest, northeast] = bounds.maxBounds;

				expect(Array.isArray(bounds.maxBounds)).toBe(true);
				expect(bounds.maxBounds).toHaveLength(2);
				expect(Array.isArray(southwest)).toBe(true);
				expect(Array.isArray(northeast)).toBe(true);
				expect(southwest).toHaveLength(2);
				expect(northeast).toHaveLength(2);
			});

			it('should have southwest coordinates less than northeast coordinates', () => {
				const [southwest, northeast] = bounds.maxBounds;
				const [swLat, swLng] = southwest;
				const [neLat, neLng] = northeast;

				expect(swLat).toBeLessThan(neLat); // Southwest lat < Northeast lat
				expect(swLng).toBeLessThan(neLng); // Southwest lng < Northeast lng
			});

			it('should cover the full UK area', () => {
				const [southwest, northeast] = bounds.maxBounds;
				const [swLat, swLng] = southwest;
				const [neLat, neLng] = northeast;

				// Verify bounds encompass the UK
				expect(swLat).toBeLessThan(50); // Below southern England
				expect(neLat).toBeGreaterThan(60); // Above northern Scotland
				expect(swLng).toBeLessThan(-7); // West of Northern Ireland
				expect(neLng).toBeGreaterThan(1.5); // East of East Anglia
			});
		});

		it('should return consistent results on multiple calls', () => {
			const bounds1 = getUKMapBounds();
			const bounds2 = getUKMapBounds();

			expect(bounds1.center).toEqual(bounds2.center);
			expect(bounds1.maxBounds).toEqual(bounds2.maxBounds);
		});

		it('should have center coordinates within the max bounds', () => {
			const [centerLat, centerLng] = bounds.center;
			const [southwest, northeast] = bounds.maxBounds;
			const [swLat, swLng] = southwest;
			const [neLat, neLng] = northeast;

			expect(centerLat).toBeGreaterThan(swLat);
			expect(centerLat).toBeLessThan(neLat);
			expect(centerLng).toBeGreaterThan(swLng);
			expect(centerLng).toBeLessThan(neLng);
		});
	});
});
