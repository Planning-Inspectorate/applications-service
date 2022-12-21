const {
	featureToggles
} = require('../../../../../src/controllers/projects/documents/utils/feature-toggles');
describe('#featureToggles', () => {
	describe('When getting the feature toggle for the document view', () => {
		const response = featureToggles();
		it('should return the config variables', () => {
			expect(response).toEqual({
				hideAllExaminationDocumentsLink: true,
				hideProjectInformationLink: true,
				hideRecommendationAndDecisionLink: true
			});
		});
	});
});
