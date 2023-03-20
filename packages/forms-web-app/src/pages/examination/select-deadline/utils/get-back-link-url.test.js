const { getBackLinkUrl } = require('./get-back-link-url');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

describe('examination/select-deadline/utils/get-back-link-url', () => {
	describe('#getBackLinkUrl', () => {
		describe('When getting the back ling URL for the select deadline page', () => {
			describe('and the query is in edit mode', () => {
				const query = 'mock query';
				let result;

				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(true);
					result = getBackLinkUrl(query);
				});

				it('should call the function', () => {
					expect(isQueryModeEdit).toHaveBeenCalledWith(query);
				});

				it('should return the url', () => {
					expect(result).toEqual('check-your-deadline-item');
				});
			});
			describe('and the query is NOT in edit mode', () => {
				let result;

				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(false);
					result = getBackLinkUrl();
				});

				it('should return the url', () => {
					expect(result).toEqual('your-email-address');
				});
			});
		});
	});
});
