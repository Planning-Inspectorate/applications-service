const { getFiltersViewModel } = require('./get-filters-view-model');
const { mockI18n } = require('../../_mocks/i18n');

const projectSearchTranslations_EN = require('../../project-search/_translations/en.json');

const i18n = mockI18n({
	projectSearch: projectSearchTranslations_EN
});

describe('_utils/filters/get-filters-view-model', () => {
	describe('#getFiltersViewModel', () => {
		describe('When transforming raw filters to view model', () => {
			let mockFilters;

			beforeEach(() => {
				mockFilters = [
					{
						name: 'region',
						value: 'north_east',
						label: 'North East',
						label_cy: 'Gogledd Ddwyrain',
						count: 5
					},
					{
						name: 'region',
						value: 'london',
						label: 'London',
						label_cy: 'Llundain',
						count: 12
					},
					{
						name: 'sector',
						value: 'energy',
						label: 'Energy',
						label_cy: 'Ynni',
						count: 8
					},
					{
						name: 'stage',
						value: 'examination',
						label: 'Examination',
						label_cy: 'Archwilio',
						count: 3
					},
					{
						name: 'stage',
						value: 'pre_application',
						label: 'Pre-application',
						label_cy: 'Cyn-ymgeisio',
						count: 7
					}
				];
			});

			describe('and no custom namespace is applied', () => {
				it('should group filters by type with translations', () => {
					const result = getFiltersViewModel(i18n, 'projectSearch', mockFilters);

					expect(result).toHaveLength(3);
					expect(result[0].name).toBe('region');
					expect(result[0].label).toBe('Location');
					expect(result[1].name).toBe('sector');
					expect(result[1].label).toBe('Sector');
					expect(result[2].name).toBe('stage');
					expect(result[2].label).toBe('Stage');
				});
			});

			describe('and filters contain region values', () => {
				it('should order region items geographically (north to south)', () => {
					const moreRegions = [
						{
							name: 'region',
							value: 'wales',
							label: 'Wales',
							label_cy: 'Cymru',
							count: 2
						},
						{
							name: 'region',
							value: 'north_west',
							label: 'North West',
							label_cy: 'Gogledd Orllewin',
							count: 4
						},
						{
							name: 'region',
							value: 'south_east',
							label: 'South East',
							label_cy: 'De Ddwyrain',
							count: 6
						},
						...mockFilters
					];

					const result = getFiltersViewModel(i18n, 'projectSearch', moreRegions);
					const regionFilter = result.find((f) => f.name === 'region');
					const regionValues = regionFilter.items.map((item) => item.value);

					// North-west first, north-east second, wales at the end (from the predefined order)
					expect(regionValues[0]).toBe('north_west');
					expect(regionValues[1]).toBe('north_east');
					expect(regionValues).toContain('wales');
					expect(regionValues).toContain('south_east');
					expect(regionValues).toContain('london');
				});
			});

			describe('and filters contain stage values', () => {
				it('should order stage items by completion sequence', () => {
					const moreStages = [
						{
							name: 'stage',
							value: 'decision',
							label: 'Decision',
							label_cy: 'Penderfyniad',
							count: 1
						},
						{
							name: 'stage',
							value: 'acceptance',
							label: 'Acceptance',
							label_cy: 'Derbyniad',
							count: 2
						},
						...mockFilters
					];

					const result = getFiltersViewModel(i18n, 'projectSearch', moreStages);
					const stageFilter = result.find((f) => f.name === 'stage');
					const stageValues = stageFilter.items.map((item) => item.value);

					// Check that pre_application comes first and decision is in the list
					expect(stageValues[0]).toBe('pre_application');
					expect(stageValues).toContain('decision');
					expect(stageValues).toContain('acceptance');
					expect(stageValues).toContain('examination');
				});
			});

			describe('and filters are in random order', () => {
				it('should return consistently ordered filter groups', () => {
					const randomOrder = [
						mockFilters[4], // stage
						mockFilters[0], // region
						mockFilters[2], // sector
						mockFilters[1], // region
						mockFilters[3] // stage
					];

					const result = getFiltersViewModel(i18n, 'projectSearch', randomOrder);

					expect(result[0].name).toBe('region');
					expect(result[1].name).toBe('sector');
					expect(result[2].name).toBe('stage');
				});
			});

			describe('and filter items have Welsh labels', () => {
				it('should use English labels when language is English', () => {
					const englishI18n = mockI18n({
						projectSearch: projectSearchTranslations_EN
					});

					const result = getFiltersViewModel(englishI18n, 'projectSearch', mockFilters);
					const regionFilter = result.find((f) => f.name === 'region');

					expect(regionFilter.items[0].label).toBe('North East');
					expect(regionFilter.items[0].label).not.toBe('Gogledd Ddwyrain');
				});
			});

			describe('and filters have count values', () => {
				it('should include count in item text', () => {
					const result = getFiltersViewModel(i18n, 'projectSearch', mockFilters);
					const regionFilter = result.find((f) => f.name === 'region');
					const londonItem = regionFilter.items.find((item) => item.value === 'london');

					expect(londonItem.text).toBe('London (12)');
				});
			});

			describe('and filters are formatted for checkbox accordion', () => {
				it('should create proper checkbox structure', () => {
					const result = getFiltersViewModel(i18n, 'projectSearch', mockFilters);

					result.forEach((filterGroup) => {
						expect(filterGroup).toHaveProperty('name');
						expect(filterGroup).toHaveProperty('label');
						expect(filterGroup).toHaveProperty('idPrefix');
						expect(filterGroup).toHaveProperty('items');
						expect(filterGroup).toHaveProperty('type', 'checkbox');
						expect(filterGroup).toHaveProperty('isOpen', false);

						filterGroup.items.forEach((item) => {
							expect(item).toHaveProperty('value');
							expect(item).toHaveProperty('label');
							expect(item).toHaveProperty('text');
							expect(item).toHaveProperty('checked', false);
						});
					});
				});
			});

			describe('and empty filters array is provided', () => {
				it('should return empty array', () => {
					const result = getFiltersViewModel(i18n, 'projectSearch', []);

					expect(result).toEqual([]);
				});
			});
		});
	});
});
