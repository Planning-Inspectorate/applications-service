const { featureToggles } = require('./feature-toggles');
describe('#featureToggles', () => {
	describe('When getting the feature toggle for the document view', () => {
		const response = featureToggles();
		it('should return the config variables', () => {
			expect(response).toEqual({
				allowProjectInformation: true
			});
		});
	});
});
