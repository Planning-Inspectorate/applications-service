const {
	getRedirectUrl
} = require('../../../../../../src/controllers/examination/evidence-or-comment/utils/get-redirect-url');

describe('controllers/examination/evidence-or-comment/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the redirect url for evidence and comment page', () => {
			const options = {
				1: {
					value: 'comment',
					text: 'Write a comment'
				},
				2: {
					value: 'upload',
					text: 'Upload files'
				},
				3: {
					value: 'both',
					text: 'Both'
				}
			};
			describe('and the selected value is comment', () => {
				const value = 'comment';
				const result = getRedirectUrl(options, value);
				it('should return the enter a comment route', () => {
					expect(result).toEqual('/examination/enter-a-comment');
				});
			});
			describe('and the selected value is upload', () => {
				const value = 'upload';
				const result = getRedirectUrl(options, value);
				it('should return the select a file route', () => {
					expect(result).toEqual('/examination/select-a-file');
				});
			});
			describe('and the selected value is both', () => {
				const value = 'both';
				const result = getRedirectUrl(options, value);
				it('should return the enter a comment route', () => {
					expect(result).toEqual('/examination/enter-a-comment');
				});
			});
			describe('and there is an error', () => {
				it('should return the enter a comment route', () => {
					expect(() => getRedirectUrl(options, '')).toThrow('No redirect url found');
				});
			});
		});
	});
});
