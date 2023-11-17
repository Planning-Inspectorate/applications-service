const { getUpdatesHowOftenURL } = require('./get-updates-how-often-url');

describe('pages/projects/get-updates/how-often/utils/get-updates-how-often-url', () => {
	describe('#getUpdatesHowOftenURL', () => {
		describe('When getting the projects updates how often URL', () => {
			describe('and a case reference is not provided', () => {
				const projectUpdateHowOftenURL = getUpdatesHowOftenURL();
				it('should return the projects documents URL with the route parameters', () => {
					expect(projectUpdateHowOftenURL).toEqual('/projects/:case_ref/get-updates/how-often');
				});
			});
			describe('and a case reference is provided', () => {
				const projectUpdateHowOftenURL = getUpdatesHowOftenURL('mock-case-reference');
				it('should return the projects documents URL with the case reference', () => {
					expect(projectUpdateHowOftenURL).toEqual(
						'/projects/mock-case-reference/get-updates/how-often'
					);
				});
			});
		});
	});
});
