const { getFilters } = require('./get-filters');

const { mockI18n } = require('../../../_mocks/i18n');

const projectSearchTranslations_EN = require('../../_translations/en.json');

const i18n = mockI18n({
	projectSearch: projectSearchTranslations_EN
});

describe('project-search/utils/filters/get-filters', () => {
	describe('#getFilters', () => {
		describe('When getting the filters for the project search page', () => {
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
						value: 'mock_value_5',
						label: 'mock label 5',
						count: 5
					},
					{
						name: 'stage',
						value: 'mock_value_6',
						label: 'mock label 6',
						count: 6
					}
				];

				jest.clearAllMocks();
			});
			describe('and there are no selected filters', () => {
				let filters;

				beforeEach(() => {
					filters = getFilters(i18n, {}, mockFilters);
				});
				it('should return the filters view model with no active filters', () => {
					expect(filters).toEqual({
						activeFilters: [],
						filters: [
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
										label: 'mock label 5',
										text: 'mock label 5 (5)',
										value: 'mock_value_5'
									},
									{
										checked: false,
										label: 'mock label 6',
										text: 'mock label 6 (6)',
										value: 'mock_value_6'
									}
								],
								label: 'Stage',
								name: 'stage',
								title: 'Stage',
								type: 'checkbox'
							}
						]
					});
				});
			});

			describe('and there are selected filters', () => {
				let filters;

				beforeEach(() => {
					filters = getFilters(
						i18n,
						{
							region: 'north_west',
							sector: ['mock_value_3', 'mock_value_4'],
							stage: 'mock_value_6'
						},
						mockFilters
					);
				});
				it('should return the filters view model with active filters', () => {
					expect(filters).toEqual({
						activeFilters: [
							{
								label: 'Location',
								tags: [
									{
										icon: 'close',
										link: '?sector=mock_value_3&sector=mock_value_4&stage=mock_value_6',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> North West <span class="govuk-visually-hidden">filter</span>'
									}
								]
							},
							{
								label: 'Sector',
								tags: [
									{
										icon: 'close',
										link: '?region=north_west&sector=mock_value_4&stage=mock_value_6',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> mock label 3 <span class="govuk-visually-hidden">filter</span>'
									},
									{
										icon: 'close',
										link: '?region=north_west&sector=mock_value_3&stage=mock_value_6',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> mock label 4 <span class="govuk-visually-hidden">filter</span>'
									}
								]
							},
							{
								label: 'Stage',
								tags: [
									{
										icon: 'close',
										link: '?region=north_west&sector=mock_value_3&sector=mock_value_4',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> mock label 6 <span class="govuk-visually-hidden">filter</span>'
									}
								]
							}
						],
						filters: [
							{
								idPrefix: 'region-option',
								isOpen: false,
								items: [
									{
										checked: true,
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
										checked: true,
										label: 'mock label 3',
										text: 'mock label 3 (3)',
										value: 'mock_value_3'
									},
									{
										checked: true,
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
										label: 'mock label 5',
										text: 'mock label 5 (5)',
										value: 'mock_value_5'
									},
									{
										checked: true,
										label: 'mock label 6',
										text: 'mock label 6 (6)',
										value: 'mock_value_6'
									}
								],
								label: 'Stage',
								name: 'stage',
								title: 'Stage',
								type: 'checkbox'
							}
						]
					});
				});
			});
		});
	});
});
