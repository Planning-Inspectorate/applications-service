const { getSubmissionItemPageUrl } = require('./get-submission-item-page-url');

describe('examination/utils/get-submission-item-page-url', () => {
	describe('#getSubmissionItemPageUrl', () => {
		describe('When getting the submission item page url', () => {
			const mockRouteValue = '/mock-route-value';
			describe('and the query has a mode that equals "edit"', () => {
				const mockQueryValue = {
					mode: 'edit'
				};
				const result = getSubmissionItemPageUrl(mockQueryValue, mockRouteValue);
				it('should return the URL', () => {
					expect(result).toEqual('check-your-deadline-item');
				});
			});
			describe('and the query does not have a mode', () => {
				describe('and has a route', () => {
					const mockQueryValue = {};
					const result = getSubmissionItemPageUrl(mockQueryValue, mockRouteValue);
					it('should return the URL', () => {
						expect(result).toEqual(`${mockRouteValue}`);
					});
				});
				describe('and does not have a route', () => {
					it('should throw an error', () => {
						expect(() => getSubmissionItemPageUrl()).toThrowError('Route is undefined');
					});
				});
			});
		});
	});
});
