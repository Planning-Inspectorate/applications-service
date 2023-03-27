const { getBackLink } = require('./get-back-link');

describe('have your say #getBackLink', () => {
	describe('When getting the back link for the have your say page', () => {
		describe('and the user have come from the server host', () => {
			const response = getBackLink('mock case ref', `http://localhost:3000/own-path`);
			it('should return the referrer link', () => {
				expect(response).toEqual('http://localhost:3000/own-path');
			});
		});
		describe('and the user has not come from the server host', () => {
			const response = getBackLink('mock case ref', '');
			it('should return empty', () => {
				expect(response).toEqual('');
			});
		});
	});
});
