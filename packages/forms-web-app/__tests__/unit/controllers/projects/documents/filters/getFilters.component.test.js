const {
	getFilters
} = require('../../../../../../src/controllers/projects/documents/utils/filters/getFilters');
describe('component', () => {
	describe('#getFilters', () => {
		describe('When getting the filters for the UI', () => {
			const mockFiltersFromAPI = [
				{
					name: 'filter-group',
					value: '1',
					count: '1',
					label: 'filter group 1 label',
					type: [
						{ value: 'filter-group1-item-1', count: '1' },
						{ value: 'should not be checked', count: '5' }
					]
				},
				{
					name: 'filter-group',
					value: '2',
					count: '7',
					label: 'filter group 2 label',
					type: [
						{ value: 'filter-group2-item-1', count: '2' },
						{ value: 'filter-group2-item-2', count: '1' }
					]
				}
			];
			const mockQuery = {
				'filter-group-1': 'filter-group1-item-1',
				'filter-group-2': ['filter-group2-item-1', 'filter-group2-item-2']
			};
			const result = getFilters(mockFiltersFromAPI, mockQuery);
			it('should return the filters in mapped and in the view model', () => {
				expect(result).toEqual({
					activeFilters: [
						{
							label: 'filter group 1 label',
							tags: [
								{
									alt: 'Remove filter-group1-item-1 filter',
									icon: 'close',
									link: '?filter-group-2=filter-group2-item-1&filter-group-2=filter-group2-item-2',
									text: 'filter-group1-item-1'
								}
							]
						},
						{
							label: 'filter group 2 label',
							tags: [
								{
									alt: 'Remove filter-group2-item-1 filter',
									icon: 'close',
									link: '?filter-group-1=filter-group1-item-1&filter-group-2=filter-group2-item-2',
									text: 'filter-group2-item-1'
								},
								{
									alt: 'Remove filter-group2-item-2 filter',
									icon: 'close',
									link: '?filter-group-1=filter-group1-item-1&filter-group-2=filter-group2-item-1',
									text: 'filter-group2-item-2'
								}
							]
						}
					],
					datesFilterErrorSummary: null,
					filters: [
						{
							idPrefix: 'filter-group-1',
							isOpen: false,
							items: [
								{
									checked: true,
									text: 'filter-group1-item-1 (1)',
									value: 'filter-group1-item-1'
								},
								{
									checked: false,
									text: 'should not be checked (5)',
									value: 'should not be checked'
								}
							],
							label: 'filter group 1 label',
							name: 'filter-group-1',
							title: 'filter group 1 label (1)',
							type: 'checkbox'
						},
						{
							idPrefix: 'filter-group-2',
							isOpen: false,
							items: [
								{
									checked: true,
									text: 'filter-group2-item-1 (2)',
									value: 'filter-group2-item-1'
								},
								{
									checked: true,
									text: 'filter-group2-item-2 (1)',
									value: 'filter-group2-item-2'
								}
							],
							label: 'filter group 2 label',
							name: 'filter-group-2',
							title: 'filter group 2 label (7)',
							type: 'checkbox'
						},
						{
							errorSummary: null,
							formGroups: [
								{
									errorMessage: null,
									errorMessageTitle: 'from',
									id: 'docments-page-date-from-form-group',
									inputNamePrefix: 'date-from',
									inputs: [
										{
											classes: 'govuk-input--width-2',
											name: 'day',
											value: ''
										},
										{
											classes: 'govuk-input--width-2',
											name: 'month',
											value: ''
										},
										{
											classes: 'govuk-input--width-4',
											name: 'year',
											value: ''
										}
									],
									name: 'date-from',
									title: 'From'
								},
								{
									errorMessage: null,
									errorMessageTitle: 'to',
									id: 'docments-page-date-to-form-group',
									inputNamePrefix: 'date-to',
									inputs: [
										{
											classes: 'govuk-input--width-2',
											name: 'day',
											value: ''
										},
										{
											classes: 'govuk-input--width-2',
											name: 'month',
											value: ''
										},
										{
											classes: 'govuk-input--width-4',
											name: 'year',
											value: ''
										}
									],
									name: 'date-to',
									title: 'To'
								}
							],
							isOpen: false,
							title: 'Date published',
							type: 'date'
						}
					]
				});
			});
		});
	});
});
