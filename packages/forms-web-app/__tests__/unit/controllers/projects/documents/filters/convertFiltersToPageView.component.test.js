const {
	convertFiltersToPageView
} = require('../../../../../../src/controllers/projects/documents/utils/filters/convertFiltersToPageView');
describe('#convertFiltersToPageView', () => {
	describe('When given a filter list from the API', () => {
		describe('and there are filters to map', () => {
			const filters = [
				{
					name: 'mock name',
					value: 'mock value',
					count: '1',
					label: 'mock label',
					type: [{ value: 'mock type value', count: '1' }]
				},
				{
					name: 'second mock name',
					value: 'second mock value',
					count: '2',
					label: 'second mock label',
					type: [{ value: 'second mock type value', count: '2' }]
				}
			];
			const response = convertFiltersToPageView(filters);
			it('should map the filter to correct structure', () => {
				expect(response).toEqual([
					{
						idPrefix: 'mock-name-mock-value',
						isOpen: false,
						label: 'mock label',
						items: [
							{
								checked: false,
								text: 'mock type value (1)',
								value: 'mock type value'
							}
						],
						name: 'mock name-mock value',
						title: 'mock label (1)',
						type: 'checkbox'
					},
					{
						idPrefix: 'second-mock-name-second-mock-value',
						isOpen: false,
						label: 'second mock label',
						items: [
							{
								checked: false,
								text: 'second mock type value (2)',
								value: 'second mock type value'
							}
						],
						name: 'second mock name-second mock value',
						title: 'second mock label (2)',
						type: 'checkbox'
					}
				]);
			});
		});
	});
});
