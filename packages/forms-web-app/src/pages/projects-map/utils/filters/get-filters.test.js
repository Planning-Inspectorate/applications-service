const { getFilters } = require('./get-filters');

describe('getFilters', () => {
	const mockI18n = {
		language: 'en',
		t: (key) => {
			const translations = {
				'projectsMap.filterLabels.region': 'Location',
				'projectsMap.filterLabels.sector': 'Sector',
				'projectsMap.filterLabels.stage': 'Stage',
				'common.filter': 'Filter'
			};
			return translations[key] || key;
		}
	};

	const mockRawFilters = [
		{
			name: 'region',
			count: 10,
			label: 'London',
			label_cy: 'Llundain',
			value: 'london'
		},
		{
			name: 'region',
			count: 8,
			label: 'South East',
			label_cy: 'De-ddwyrain',
			value: 'south_east'
		},
		{
			name: 'sector',
			count: 5,
			label: 'Energy',
			label_cy: 'Ynni',
			value: 'energy'
		},
		{
			name: 'stage',
			count: 3,
			label: 'Examination',
			label_cy: 'Archwilio',
			value: 'examination'
		}
	];

	it('should return filters and activeFilters structure', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		expect(result).toHaveProperty('filters');
		expect(result).toHaveProperty('activeFilters');
	});

	it('should organize filters into groups by name', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');
		const sectorFilter = result.filters.find((f) => f.name === 'sector');
		const stageFilter = result.filters.find((f) => f.name === 'stage');

		expect(regionFilter).toBeDefined();
		expect(sectorFilter).toBeDefined();
		expect(stageFilter).toBeDefined();
	});

	it('should have correct filter items for each group', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');

		expect(regionFilter.items.length).toBe(2);
		expect(regionFilter.items.map((item) => item.value)).toContain('london');
		expect(regionFilter.items.map((item) => item.value)).toContain('south_east');
	});

	it('should mark filters as unchecked when not in query', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');

		expect(regionFilter.items[0].checked).toBe(false);
		expect(regionFilter.items[1].checked).toBe(false);
	});

	it('should mark filters as checked when in query', () => {
		const result = getFilters(mockI18n, { region: 'london' }, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');
		const londonItem = regionFilter.items.find((item) => item.value === 'london');
		const southEastItem = regionFilter.items.find((item) => item.value === 'south_east');

		expect(londonItem.checked).toBe(true);
		expect(southEastItem.checked).toBe(false);
	});

	it('should handle multiple selected filters', () => {
		const result = getFilters(mockI18n, { region: ['london', 'south_east'] }, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');

		expect(regionFilter.items[0].checked).toBe(true);
		expect(regionFilter.items[1].checked).toBe(true);
	});

	it('should return empty activeFilters when no filters selected', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		expect(result.activeFilters).toEqual([]);
	});

	it('should populate activeFilters for selected region', () => {
		const result = getFilters(mockI18n, { region: 'london' }, mockRawFilters);
		expect(result.activeFilters.length).toBeGreaterThan(0);
		// activeFilters[0].label will be 'Location' from getFiltersViewModel
		const regionActive = result.activeFilters[0];
		expect(regionActive).toBeDefined();
		expect(regionActive.tags.length).toBe(1);
	});

	it('should create tags with remove links for active filters', () => {
		const result = getFilters(mockI18n, { region: 'london' }, mockRawFilters);
		const regionActive = result.activeFilters[0];
		expect(regionActive.tags[0]).toHaveProperty('link');
		expect(regionActive.tags[0].link).toContain('?');
	});

	it('should order filter groups correctly (region, sector, stage)', () => {
		const result = getFilters(mockI18n, {}, mockRawFilters);
		expect(result.filters[0].name).toBe('region');
		expect(result.filters[1].name).toBe('sector');
		expect(result.filters[2].name).toBe('stage');
	});
});
