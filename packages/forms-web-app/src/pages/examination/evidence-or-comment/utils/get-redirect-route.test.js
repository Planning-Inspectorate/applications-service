const { getRedirectRoute } = require('./get-redirect-route');

describe('examination/evidence-or-comment/utils/get-redirect-route', () => {
	describe('#getRedirectRoute', () => {
		describe('When getting the redirect route for the evidence or comment page', () => {
			describe('and the passed argument is "comment"', () => {
				const route = getRedirectRoute('comment');
				it('should return the route', () => {
					expect(route).toEqual('enter-a-comment');
				});
			});
			describe('and the passed argument is "upload"', () => {
				const route = getRedirectRoute('upload');
				it('should return the route', () => {
					expect(route).toEqual('select-a-file');
				});
			});
			describe('and the passed argument is "both"', () => {
				const route = getRedirectRoute('both');
				it('should return the route', () => {
					expect(route).toEqual('enter-a-comment');
				});
			});
			describe('and the passed argument does not match a required submission type', () => {
				it('should throw the error', () => {
					expect(() => getRedirectRoute('')).toThrow(
						'Value does not match a required submission type'
					);
				});
			});
		});
	});
});
