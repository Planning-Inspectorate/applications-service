const { getPageData } = require('./get-page-data');

describe('getPageData', () => {
	const mockI18n = {
		language: 'en',
		t: (key) => {
			const translations = {
				'projectsMap.filterLabels.region': 'Location',
				'projectsMap.filterLabels.sector': 'Sector',
				'projectsMap.filterLabels.stage': 'Stage'
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

	const mockApplications = [];

	it('should return object with filters and activeFilters properties', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		expect(result).toHaveProperty('filters');
		expect(result).toHaveProperty('activeFilters');
	});

	it('should contain formatted filters for UI rendering', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		expect(Array.isArray(result.filters)).toBe(true);
		expect(result.filters.length).toBeGreaterThan(0);
	});

	it('should contain activeFilters array', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		expect(Array.isArray(result.activeFilters)).toBe(true);
	});

	it('should return empty activeFilters when no query params provided', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		expect(result.activeFilters.length).toBe(0);
	});

	it('should return populated activeFilters when query params provided', () => {
		const result = getPageData(mockI18n, { region: 'london' }, mockApplications, mockRawFilters);
		expect(result.activeFilters.length).toBeGreaterThan(0);
	});

	it('should format filters with all required properties', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		const filter = result.filters[0];

		expect(filter).toHaveProperty('name');
		expect(filter).toHaveProperty('label');
		expect(filter).toHaveProperty('items');
		expect(filter).toHaveProperty('idPrefix');
		expect(Array.isArray(filter.items)).toBe(true);
	});

	it('should format filter items with required properties', () => {
		const result = getPageData(mockI18n, {}, mockApplications, mockRawFilters);
		const filterItems = result.filters[0].items;

		if (filterItems.length > 0) {
			const item = filterItems[0];
			expect(item).toHaveProperty('value');
			expect(item).toHaveProperty('label');
			expect(item).toHaveProperty('text');
			expect(item).toHaveProperty('checked');
		}
	});

	it('should mark selected filters as checked', () => {
		const result = getPageData(mockI18n, { region: 'london' }, mockApplications, mockRawFilters);
		const regionFilter = result.filters.find((f) => f.name === 'region');
		const selectedItem = regionFilter.items.find((item) => item.value === 'london');

		expect(selectedItem.checked).toBe(true);
	});
});
