const { featureToggles } = require('./feature-toggles');
describe('#featureToggles', () => {
	describe('When getting the feature toggle for the document view', () => {
		const response = featureToggles();
		it('should return the config variables', () => {
			expect(response).toEqual({
				hideAllExaminationDocumentsLink: true,
<<<<<<< HEAD
				allowProjectInformation: false
=======
				hideProjectInformationLink: false
>>>>>>> 1f002a41 (feat(projects): attach applicationData to locals; add and fix tests)
			});
		});
	});
});
