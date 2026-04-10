const { getUpdatesSubscribedURL } = require('./get-updates-subscribed-url');

describe('pages/projects/get-updates/subscribed/utils/get-updates-subscribed-url', () => {
	describe('#getUpdatesSubscribedURL', () => {
		describe('When getting the projects updates subscribed URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesSubscribedURL();
				it('should return the projects get updates subscribed URL with the route parameters', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/:case_ref/get-updates/subscribed'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesSubscribedURL('mock-case-reference');
				it('should return the projects get updates subscribed URL with the case reference', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/mock-case-reference/get-updates/subscribed'
					);
				});
			});
		});
	});
});
