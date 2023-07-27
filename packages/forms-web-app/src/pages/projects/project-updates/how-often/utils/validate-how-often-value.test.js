const { validateHowOftenValue } = require('./validate-how-often-value');

describe('projects/project-updates/how-often/utils/validate-how-often-value', () => {
	describe('#validateHowOftenValue', () => {
		describe('When validating the selected project updates how often values', () => {
			describe('and no value have been selected', () => {
				const selectedHowOftenValues = null;

				it('should throw an error', () => {
					expect(() => validateHowOftenValue(selectedHowOftenValues)).toThrow(Error);
				});
			});

			describe('and an invalid combination of values have been selected', () => {
				const selectedHowOftenValues = ['allUpdates', 'applicationSubmitted'];

				it('should throw an error', () => {
					expect(() => validateHowOftenValue(selectedHowOftenValues)).toThrow(Error);
				});
			});

			describe('and a valid value has been selected', () => {
				const selectedHowOftenValues = ['allUpdates'];
				it('should return true', () => {
					expect(validateHowOftenValue(selectedHowOftenValues)).toEqual(true);
				});
			});
		});
	});
});
