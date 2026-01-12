const { getFilters } = require('./get-filters');
const { mockI18n } = require('../../../_mocks/i18n');

const projectsMapTranslations_EN = require('../../_translations/en.json');

const i18n = mockI18n({
	projectsMap: projectsMapTranslations_EN
});

describe('projects-map/utils/filters/get-filters', () => {
	describe('#getFilters', () => {
		describe('When getting filters for the projects map page', () => {
			let mockFilters;

			beforeEach(() => {
				mockFilters = [
					{
						name: 'region',
						value: 'london',
						label: 'London',
						label_cy: 'Llundain',
						count: 8
					},
					{
						name: 'region',
						value: 'south_east',
						label: 'South East',
						label_cy: 'De Ddwyrain',
						count: 5
					},
					{
						name: 'sector',
						value: 'energy',
						label: 'Energy',
						label_cy: 'Ynni',
						count: 6
					},
					{
						name: 'stage',
						value: 'examination',
						label: 'Examination',
						label_cy: 'Archwilio',
						count: 4
					}
				];
			});

			describe('and no filters are selected', () => {
				let result;

				beforeEach(() => {
					result = getFilters(i18n, {}, mockFilters);
				});

				it('should return all available filters with no active selections', () => {
					expect(result.filters).toHaveLength(3);
					expect(result.activeFilters).toEqual([]);
				});

				it('should format filters with correct labels using projectsMap namespace', () => {
					const regionFilter = result.filters.find((f) => f.name === 'region');

					expect(regionFilter.label).toBe('Location');
					expect(regionFilter.name).toBe('region');
					expect(regionFilter.items).toHaveLength(2);
				});

				it('should have all items unchecked', () => {
					result.filters.forEach((filterGroup) => {
						filterGroup.items.forEach((item) => {
							expect(item.checked).toBe(false);
						});
					});
				});
			});

			describe('and single filters are selected', () => {
				let result;

				beforeEach(() => {
					result = getFilters(
						i18n,
						{
							region: 'london',
							sector: 'energy'
						},
						mockFilters
					);
				});

				it('should mark selected filters as checked', () => {
					const regionFilter = result.filters.find((f) => f.name === 'region');
					const londonItem = regionFilter.items.find((item) => item.value === 'london');

					expect(londonItem.checked).toBe(true);
				});

				it('should create active filters for selected items', () => {
					expect(result.activeFilters).toHaveLength(2);
					expect(result.activeFilters[0].label).toBe('Location');
					expect(result.activeFilters[1].label).toBe('Sector');
				});

				it('should generate removal links in active filters', () => {
					const locationActiveFilter = result.activeFilters.find((f) => f.label === 'Location');
					const tag = locationActiveFilter.tags[0];

					expect(tag.icon).toBe('close');
					expect(tag.link).toContain('sector=energy');
					expect(tag.link).not.toContain('region=london');
				});
			});

			describe('and multiple values for same filter are selected', () => {
				let result;

				beforeEach(() => {
					result = getFilters(
						i18n,
						{
							region: ['london', 'south_east'],
							stage: 'examination'
						},
						mockFilters
					);
				});

				it('should mark all selected regions as checked', () => {
					const regionFilter = result.filters.find((f) => f.name === 'region');
					const londonItem = regionFilter.items.find((item) => item.value === 'london');
					const seItem = regionFilter.items.find((item) => item.value === 'south_east');

					expect(londonItem.checked).toBe(true);
					expect(seItem.checked).toBe(true);
				});

				it('should create multiple tags for region filter', () => {
					const locationActiveFilter = result.activeFilters.find((f) => f.label === 'Location');

					expect(locationActiveFilter.tags).toHaveLength(2);
				});

				it('should preserve other filters when removing one region', () => {
					const locationActiveFilter = result.activeFilters.find((f) => f.label === 'Location');
					const firstTag = locationActiveFilter.tags[0];

					expect(firstTag.link).toContain('region=');
					expect(firstTag.link).toContain('stage=examination');
				});
			});

			describe('and all filter types have selections', () => {
				let result;

				beforeEach(() => {
					result = getFilters(
						i18n,
						{
							region: 'london',
							sector: 'energy',
							stage: 'examination'
						},
						mockFilters
					);
				});

				it('should return filters with correct order (region, sector, stage)', () => {
					const filterNames = result.filters.map((f) => f.name);

					expect(filterNames).toEqual(['region', 'sector', 'stage']);
				});

				it('should create active filters for all three types', () => {
					expect(result.activeFilters).toHaveLength(3);
					const labels = result.activeFilters.map((f) => f.label);

					expect(labels).toContain('Location');
					expect(labels).toContain('Sector');
					expect(labels).toContain('Stage');
				});
			});
		});
	});
});
