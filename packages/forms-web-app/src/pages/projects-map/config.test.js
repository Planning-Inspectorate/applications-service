const { projectsMapRoute, mapConfig, stageColorMapping, boundaryStyle } = require('./config');

describe('pages/projects-map/config', () => {
	describe('#projectsMapRoute', () => {
		it('should return the projects map route', () => {
			expect(projectsMapRoute).toEqual('/projects-map');
		});
	});

	describe('#mapConfig', () => {
		it('should have valid UK bounds', () => {
			expect(mapConfig.bounds.southwest).toEqual([49.528423, -10.76418]);
			expect(mapConfig.bounds.northeast).toEqual([61.331151, 1.9134116]);
		});

		it('should have valid zoom levels', () => {
			expect(mapConfig.minZoom).toBe(6);
			expect(mapConfig.maxZoom).toBe(18);
			expect(mapConfig.defaultZoom).toBe(6);
		});

		it('should have UK center coordinates', () => {
			expect(mapConfig.center).toEqual([54.5, -4.0]);
		});
	});

	describe('#stageColorMapping', () => {
		it('should have colors for all 8 stages', () => {
			expect(Object.keys(stageColorMapping).length).toBe(8);
		});

		it('should have valid hex color format', () => {
			Object.values(stageColorMapping).forEach((color) => {
				expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
			});
		});
	});

	describe('#boundaryStyle', () => {
		it('should have valid style properties', () => {
			expect(boundaryStyle.fillColor).toBeDefined();
			expect(boundaryStyle.color).toBeDefined();
			expect(boundaryStyle.weight).toBeGreaterThan(0);
			expect(boundaryStyle.opacity).toBeGreaterThan(0);
			expect(boundaryStyle.fillOpacity).toBeGreaterThan(0);
		});
	});
});
