const { mapFilterTypeToCheckBox } = require('./mappers');
const { mockI18n } = require('../../../../_mocks/i18n');

describe('#mapFilterTypeToCheckBox', () => {
	describe('When mapping a list of filters to a list of checkboxes', () => {
		const items = [
			{ value: 'mock value', count: '1' },
			{ value: 'mock value second', count: '2' }
		];
		const result = mapFilterTypeToCheckBox(mockI18n, items);
		it('should return an array of checkboxes', () => {
			expect(result).toEqual([
				{
					text: 'mock value (1)',
					value: 'mock value',
					checked: false
				},
				{
					text: 'mock value second (2)',
					value: 'mock value second',
					checked: false
				}
			]);
		});
	});
});
