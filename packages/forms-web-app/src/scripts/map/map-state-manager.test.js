const mapStateManager = require('./map-state-manager');

describe('scripts/map/map-state-manager', () => {
	beforeEach(() => {
		mapStateManager.clearMap();
	});

	it('should store and retrieve valid Leaflet map instances', () => {
		const mockMap = { getZoom: jest.fn(() => 7) };

		mapStateManager.setMap(mockMap);

		expect(mapStateManager.getMap()).toBe(mockMap);
		expect(mapStateManager.hasMap()).toBe(true);
	});

	it('should reject invalid map instances', () => {
		[null, undefined, {}, { getZoom: 'not-a-function' }].forEach((input) => {
			expect(() => mapStateManager.setMap(input)).toThrow();
		});
		expect(mapStateManager.hasMap()).toBe(false);
	});

	it('should clear map state', () => {
		mapStateManager.setMap({ getZoom: jest.fn() });

		mapStateManager.clearMap();

		expect(mapStateManager.getMap()).toBeNull();
		expect(mapStateManager.hasMap()).toBe(false);
	});
});
