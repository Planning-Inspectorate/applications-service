const {
	getSelectedOptionText
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/helpers');

describe('controllers/examination/check-your-answers/utils/summary-list-item/helpers', () => {
	describe('#getSelectedOptionText', () => {
		describe('When getting the text for the selected option value', () => {
			const mockOptions = {
				mockOptionOne: {
					text: 'mock text one',
					value: 'mock value one'
				},
				mockOptionTwo: {
					text: 'mock text two',
					value: 'mock value two'
				}
			};
			describe('and the value matches an option value', () => {
				const mockValue = 'mock value two';
				const result = getSelectedOptionText(mockOptions, mockValue);
				it('should return the selected option text', () => {
					expect(result).toEqual('mock text two');
				});
			});
		});
	});
});
