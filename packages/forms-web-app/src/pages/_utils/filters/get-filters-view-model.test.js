const { getFiltersViewModel } = require('./get-filters-view-model');

describe('_utils/filters/get-filters-view-model', () => {
	const createI18nWrapper = () => ({
		language: 'en',
		t: (key) => {
			const translations = {
				'filterLabels.region': 'Location',
				'filterLabels.sector': 'Sector',
				'filterLabels.stage': 'Stage'
			};
			return translations[key] || key;
		}
	});

	const mockRawFilters = [
		{ name: 'region', count: 10, label: 'London', label_cy: 'Llundain', value: 'london' },
		{ name: 'region', count: 8, label: 'South East', label_cy: 'De-ddwyrain', value: 'south_east' },
		{
			name: 'region',
			count: 6,
			label: 'East Anglia',
			label_cy: 'Dwyrain Anglia',
			value: 'eastern'
		},
		{ name: 'sector', count: 5, label: 'Energy', label_cy: 'Ynni', value: 'energy' },
		{ name: 'stage', count: 3, label: 'Examination', label_cy: 'Archwilio', value: 'examination' }
	];

	it('should return array of filter groups', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
	});

	it('should organize filters into groups by name', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');
		const sectorFilter = result.find((f) => f.name === 'sector');
		const stageFilter = result.find((f) => f.name === 'stage');

		expect(regionFilter).toBeDefined();
		expect(sectorFilter).toBeDefined();
		expect(stageFilter).toBeDefined();
	});

	it('should order filter groups as region, sector, stage', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		expect(result[0].name).toBe('region');
		expect(result[1].name).toBe('sector');
		expect(result[2].name).toBe('stage');
	});

	it('should have correct items for each filter group', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');

		expect(regionFilter.items.length).toBe(3);
		expect(regionFilter.items.map((i) => i.value)).toContain('london');
		expect(regionFilter.items.map((i) => i.value)).toContain('south_east');
		expect(regionFilter.items.map((i) => i.value)).toContain('eastern');
	});

	it('should order region items according to locationOrder constant', () => {
		// This test verifies items are ordered by the locationOrder constant
		// The order is: north_west, north_east, yorkshire..., east_midlands, eastern, south_west, south_east, london, wales
		const testFilters = [
			{ name: 'region', count: 1, label: 'London', label_cy: 'Llundain', value: 'london' },
			{
				name: 'region',
				count: 1,
				label: 'South West',
				label_cy: 'De-orllewin',
				value: 'south_west'
			}
		];

		const result = getFiltersViewModel(createI18nWrapper(), testFilters);
		const regionFilter = result.find((f) => f.name === 'region');

		// South West comes before London in the locationOrder
		expect(regionFilter.items[0].value).toBe('south_west');
		expect(regionFilter.items[1].value).toBe('london');
	});

	it('should translate filter group labels', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');
		const sectorFilter = result.find((f) => f.name === 'sector');
		const stageFilter = result.find((f) => f.name === 'stage');

		expect(regionFilter.label).toBe('Location');
		expect(sectorFilter.label).toBe('Sector');
		expect(stageFilter.label).toBe('Stage');
	});

	it('should create filter items with required properties', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');
		const item = regionFilter.items[0];

		expect(item).toHaveProperty('value');
		expect(item).toHaveProperty('label');
		expect(item).toHaveProperty('text');
		expect(item).toHaveProperty('checked');
	});

	it('should format item text with count', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');
		const londonItem = regionFilter.items.find((i) => i.value === 'london');

		expect(londonItem.text).toContain('London');
		expect(londonItem.text).toContain('(10)');
	});

	it('should initialize all items as unchecked', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);

		result.forEach((filterGroup) => {
			filterGroup.items.forEach((item) => {
				expect(item.checked).toBe(false);
			});
		});
	});

	it('should handle empty filters array', () => {
		const result = getFiltersViewModel(createI18nWrapper(), []);
		expect(result).toEqual([]);
	});

	it('should create idPrefix for each filter group', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);

		result.forEach((filterGroup) => {
			expect(filterGroup).toHaveProperty('idPrefix');
			expect(typeof filterGroup.idPrefix).toBe('string');
			expect(filterGroup.idPrefix.length).toBeGreaterThan(0);
		});
	});

	it('should use Welsh labels when language is Welsh', () => {
		const welshI18n = {
			language: 'cy',
			t: (key) => {
				const translations = {
					'filterLabels.region': 'Lleoliad',
					'filterLabels.sector': 'Sector',
					'filterLabels.stage': 'Cam'
				};
				return translations[key] || key;
			}
		};

		const result = getFiltersViewModel(welshI18n, mockRawFilters);
		const regionFilter = result.find((f) => f.name === 'region');
		const londonItem = regionFilter.items.find((i) => i.value === 'london');

		expect(londonItem.label).toBe('Llundain');
	});

	it('should have correct properties for each filter group', () => {
		const result = getFiltersViewModel(createI18nWrapper(), mockRawFilters);

		result.forEach((filterGroup) => {
			expect(filterGroup).toHaveProperty('name');
			expect(filterGroup).toHaveProperty('label');
			expect(filterGroup).toHaveProperty('items');
			expect(filterGroup).toHaveProperty('idPrefix');
			expect(filterGroup).toHaveProperty('isOpen');
			expect(filterGroup).toHaveProperty('title');
			expect(filterGroup).toHaveProperty('type');
			expect(filterGroup.type).toBe('checkbox');
		});
	});
});
