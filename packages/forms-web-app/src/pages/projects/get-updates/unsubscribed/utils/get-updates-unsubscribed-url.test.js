const { getUpdatesUnsubscribedURL } = require('./get-updates-unsubscribed-url');

describe('pages/projects/get-updates/unsubscribe/utils/get-updates-unsubscribe-url', () => {
	describe('#getUpdatesUnsubscribedURL', () => {
		describe('When getting the projects updates unsubscribe URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesUnsubscribedURL();
				it('should return the projects get updates unsubscribe URL with the route parameters', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/:case_ref/get-updates/unsubscribed'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesUnsubscribedURL('mock-case-reference');
				it('should return the projects get updates unsubscribe URL with the case reference', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/mock-case-reference/get-updates/unsubscribed'
					);
				});
			});
		});
	});
});
