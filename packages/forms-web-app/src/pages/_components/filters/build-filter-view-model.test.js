const { buildFilterViewModel } = require('./build-filter-view-model');
const { mockI18n } = require('../../_mocks/i18n');

const projectSearchTranslations_EN = require('../../../pages/project-search/_translations/en.json');

const i18n = mockI18n({
	projectSearch: projectSearchTranslations_EN
});

describe('_components/filters/build-filter-view-model', () => {
	describe('#buildFilterViewModel', () => {
		describe('When building the filters view model', () => {
			let mockFilters;

			beforeEach(() => {
				mockFilters = [
					{
						name: 'region',
						value: 'north_east',
						label: 'North East',
						count: 1
					},
					{
						name: 'region',
						value: 'north_west',
						label: 'North West',
						count: 2
					},
					{
						name: 'sector',
						value: 'mock_value_3',
						label: 'mock label 3',
						count: 3
					},
					{
						name: 'sector',
						value: 'mock_value_4',
						label: 'mock label 4',
						count: 4
					},
					{
						name: 'stage',
						value: 'pre_application',
						label: 'Pre-application',
						count: 5
					},
					{
						name: 'stage',
						value: 'acceptance',
						label: 'Acceptance',
						count: 6
					}
				];
			});

			it('should return the filters view model with correct structure', () => {
				const result = buildFilterViewModel(i18n, mockFilters);

				expect(result).toEqual([
					{
						idPrefix: 'region-option',
						isOpen: false,
						items: [
							{
								checked: false,
								label: 'North West',
								text: 'North West (2)',
								value: 'north_west'
							},
							{
								checked: false,
								label: 'North East',
								text: 'North East (1)',
								value: 'north_east'
							}
						],
						label: 'Location',
						name: 'region',
						title: 'Location',
						type: 'checkbox'
					},
					{
						idPrefix: 'sector-option',
						isOpen: false,
						items: [
							{
								checked: false,
								label: 'mock label 3',
								text: 'mock label 3 (3)',
								value: 'mock_value_3'
							},
							{
								checked: false,
								label: 'mock label 4',
								text: 'mock label 4 (4)',
								value: 'mock_value_4'
							}
						],
						label: 'Sector',
						name: 'sector',
						title: 'Sector',
						type: 'checkbox'
					},
					{
						idPrefix: 'stage-option',
						isOpen: false,
						items: [
							{
								checked: false,
								label: 'Pre-application',
								text: 'Pre-application (5)',
								value: 'pre_application'
							},
							{
								checked: false,
								label: 'Acceptance',
								text: 'Acceptance (6)',
								value: 'acceptance'
							}
						],
						label: 'Stage',
						name: 'stage',
						title: 'Stage',
						type: 'checkbox'
					}
				]);
			});

			it('should order filter groups as Region, Sector, Stage regardless of input order', () => {
				const unorderedFilters = [
					{
						name: 'stage',
						value: 'pre_application',
						label: 'Pre-application',
						count: 5
					},
					{
						name: 'sector',
						value: 'mock_value_3',
						label: 'mock label 3',
						count: 3
					},
					{
						name: 'region',
						value: 'north_east',
						label: 'North East',
						count: 1
					}
				];

				const result = buildFilterViewModel(i18n, unorderedFilters);

				expect(result[0].name).toBe('region');
				expect(result[1].name).toBe('sector');
				expect(result[2].name).toBe('stage');
			});

			it('should order region items by geographic position', () => {
				const regionFilters = [
					{
						name: 'region',
						value: 'south_east',
						label: 'South East',
						count: 5
					},
					{
						name: 'region',
						value: 'north_west',
						label: 'North West',
						count: 2
					},
					{
						name: 'region',
						value: 'london',
						label: 'London',
						count: 10
					}
				];

				const result = buildFilterViewModel(i18n, regionFilters);
				const regionGroup = result.find((group) => group.name === 'region');

				expect(regionGroup.items.map((item) => item.value)).toEqual([
					'north_west',
					'south_east',
					'london'
				]);
			});

			it('should order stage items by project progression', () => {
				const stageFilters = [
					{
						name: 'stage',
						value: 'decision',
						label: 'Decision',
						count: 1
					},
					{
						name: 'stage',
						value: 'examination',
						label: 'Examination',
						count: 2
					},
					{
						name: 'stage',
						value: 'pre_application',
						label: 'Pre-application',
						count: 3
					}
				];

				const result = buildFilterViewModel(i18n, stageFilters);
				const stageGroup = result.find((group) => group.name === 'stage');

				expect(stageGroup.items.map((item) => item.value)).toEqual([
					'pre_application',
					'examination',
					'decision'
				]);
			});

			it('should use Welsh labels when language is Welsh', () => {
				const welshI18n = mockI18n({
					projectSearch: projectSearchTranslations_EN
				});

				welshI18n.language = 'cy';

				const filtersWithWelsh = [
					{
						name: 'region',
						value: 'wales',
						label: 'Wales',
						label_cy: 'Cymru',
						count: 5
					}
				];

				const result = buildFilterViewModel(welshI18n, filtersWithWelsh);
				const regionItem = result[0].items[0];

				expect(regionItem.label).toBe('Cymru');
				expect(regionItem.text).toBe('Cymru (5)');
			});

			it('should use custom namespace when provided', () => {
				const customNamespaceI18n = mockI18n({
					projectSearch: projectSearchTranslations_EN,
					projectsMap: {
						filterLabels: {
							region: 'Custom Location',
							sector: 'Custom Sector',
							stage: 'Custom Stage'
						}
					}
				});

				const filterData = [
					{
						name: 'region',
						value: 'north_east',
						label: 'North East',
						count: 1
					}
				];

				const result = buildFilterViewModel(customNamespaceI18n, filterData, 'projectsMap');
				const regionGroup = result[0];

				expect(regionGroup.label).toBe('Custom Location');
				expect(regionGroup.title).toBe('Custom Location');
			});
		});
	});
});
