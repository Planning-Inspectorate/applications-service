const config = require('../../../src/lib/config');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');
describe('isBackOfficeCaseReference', () => {
	const backOfficeCaseReferences = ['123456', '654321'];
	config.backOfficeIntegration.caseReferences = backOfficeCaseReferences;
	describe('when the case reference is in the back office case references', () => {
		it.each(backOfficeCaseReferences)('should return true', (caseReference) => {
			expect(isBackOfficeCaseReference(caseReference)).toBe(true);
		});
	});
	describe('when the case reference is 9 characters long', () => {
		const backOfficeCaseReference = '123456789';
		it('should return true', () => {
			expect(isBackOfficeCaseReference(backOfficeCaseReference)).toBe(true);
		});
	});
	describe('when the case reference is not in the back office case references', () => {
		it('should return false', () => {
			expect(isBackOfficeCaseReference('not-in-back-office-case-references')).toBe(false);
		});
	});
	describe('when the case reference is not in the back office case references or 8 characters long', () => {
		it('should return false', () => {
			expect(isBackOfficeCaseReference('not-in-back-office-case-references')).toBe(false);
			expect(isBackOfficeCaseReference('12345678')).toBe(false);
		});
	});
});
