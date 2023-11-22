const { getUpdatesUnsubscribeURL } = require('./get-updates-unsubscribe-url');

describe('pages/projects/get-updates/unsubscribe/utils/get-updates-unsubscribe-url', () => {
	describe('#getUpdatesUnsubscribeURL', () => {
		describe('When getting the projects updates unsubscribe URL', () => {
			describe('and a case reference is not provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesUnsubscribeURL();
				it('should return the projects get updates unsubscribe URL with the route parameters', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/:case_ref/get-updates/unsubscribe-confirm'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const getProjectUpdatesSubscribedURL = getUpdatesUnsubscribeURL('mock-case-reference');
				it('should return the projects get updates unsubscribe URL with the case reference', () => {
					expect(getProjectUpdatesSubscribedURL).toEqual(
						'/projects/mock-case-reference/get-updates/unsubscribe-confirm'
					);
				});
			});
		});
	});
});
