const { convertFiltersToPageView } = require('./convertFiltersToPageView');

const { mockI18n } = require('../../../../_mocks/i18n');

const i18n = mockI18n();

describe('#convertFiltersToPageView', () => {
	describe('When given a filter list from the API', () => {
		describe('and there are filters to map', () => {
			const filters = [
				{
					name: 'mock name',
					value: 'mock value',
					count: '1',
					label: {
						cy: 'mock label',
						en: 'mock label'
					},
					type: [{ value: 'mock type value', count: '1' }]
				},
				{
					name: 'second mock name',
					value: 'second mock value',
					count: '2',
					label: {
						cy: 'second mock label',
						en: 'second mock label'
					},
					type: [{ value: 'second mock type value', count: '2' }]
				}
			];
			const response = convertFiltersToPageView(i18n, filters);
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
