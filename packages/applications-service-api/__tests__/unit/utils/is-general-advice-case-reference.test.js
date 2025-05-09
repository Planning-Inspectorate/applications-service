const {
	isGeneralAdviceCaseReference
} = require('../../../src/utils/is-general-advice-case-reference');

describe('isGeneralAdviceCaseReference', () => {
	const generalAdviceCaseReferenceNI = 'General';
	const generalAdviceCaseReferenceCBOS = 'GS5110001';

	describe('when the case reference is the NI general advice case reference', () => {
		it('should return true', () => {
			expect(isGeneralAdviceCaseReference(generalAdviceCaseReferenceNI)).toBe(true);
		});
	});

	describe('when the case reference is the back office general advice case reference', () => {
		it('should return true', () => {
			expect(isGeneralAdviceCaseReference(generalAdviceCaseReferenceCBOS)).toBe(true);
		});
	});

	describe('when the case reference is neither the NI general advice case reference or the back office general advice case reference', () => {
		it('should return false', () => {
			expect(isGeneralAdviceCaseReference('not-general-advice')).toBe(false);
		});
	});
});
