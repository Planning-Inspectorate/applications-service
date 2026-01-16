const { getProjectsMapQueryString } = require('./get-projects-map-query-string');

describe('getProjectsMapQueryString', () => {
	it('should return empty query string when no filters provided', () => {
		const result = getProjectsMapQueryString({});
		expect(result).toBe('?');
	});

	it('should return empty query string when called with undefined', () => {
		const result = getProjectsMapQueryString();
		expect(result).toBe('?');
	});

	it('should build query string with single region filter', () => {
		const result = getProjectsMapQueryString({ region: 'london' });
		expect(result).toContain('region=london');
	});

	it('should build query string with multiple region filters', () => {
		const result = getProjectsMapQueryString({ region: ['london', 'south_east'] });
		expect(result).toContain('region');
	});

	it('should build query string with single sector filter', () => {
		const result = getProjectsMapQueryString({ sector: 'energy' });
		expect(result).toContain('sector=energy');
	});

	it('should build query string with multiple sector filters', () => {
		const result = getProjectsMapQueryString({ sector: ['energy', 'transport'] });
		expect(result).toContain('sector');
	});

	it('should build query string with single stage filter', () => {
		const result = getProjectsMapQueryString({ stage: 'examination' });
		expect(result).toContain('stage=examination');
	});

	it('should build query string with multiple stage filters', () => {
		const result = getProjectsMapQueryString({ stage: ['examination', 'decision'] });
		expect(result).toContain('stage');
	});

	it('should build query string with mixed filters', () => {
		const result = getProjectsMapQueryString({
			region: 'london',
			sector: 'energy',
			stage: 'examination'
		});
		expect(result).toContain('region=london');
		expect(result).toContain('sector=energy');
		expect(result).toContain('stage=examination');
	});

	it('should build query string with all filters as arrays', () => {
		const result = getProjectsMapQueryString({
			region: ['london', 'south_east'],
			sector: ['energy', 'transport'],
			stage: ['examination', 'decision']
		});
		expect(result.charAt(0)).toBe('?');
		expect(result.includes('region')).toBe(true);
		expect(result.includes('sector')).toBe(true);
		expect(result.includes('stage')).toBe(true);
	});

	it('should handle empty arrays', () => {
		const result = getProjectsMapQueryString({
			region: [],
			sector: [],
			stage: []
		});
		expect(result).toBe('?');
	});
});
