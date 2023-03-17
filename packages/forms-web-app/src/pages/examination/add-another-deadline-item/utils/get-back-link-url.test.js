const { getBackLinkUrl } = require('./get-back-link-url');

const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

describe('#getBackLinkUrl', () => {
	describe('When getting the back link for the check your answers page', () => {
		describe('and the page is in edit mode', () => {
			let response;
			beforeEach(() => {
				isQueryModeEdit.mockReturnValue(true);
				response = getBackLinkUrl({});
			});
			it('should return the previous page url from edit', () => {
				expect(response).toEqual('/examination/check-your-answers');
			});
		});
		describe('and the page is in the normal state', () => {
			let response;
			beforeEach(() => {
				isQueryModeEdit.mockReturnValue(false);
				response = getBackLinkUrl({});
			});
			it('should return an empty value', () => {
				expect(response).toEqual('');
			});
		});
	});
});
