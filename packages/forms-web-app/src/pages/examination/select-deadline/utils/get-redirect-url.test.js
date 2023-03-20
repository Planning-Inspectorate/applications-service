const { getRedirectUrl } = require('./get-redirect-url');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

describe('controllers/examination/select-deadline/utils/get-redirect-url', () => {
	describe('#getRedirectUrl', () => {
		const query = {
			mockQuery: 'mock query'
		};
		describe('When getting the redirect url for the select deadline page', () => {
			describe('and the query has a mode that is set to edit', () => {
				let result;
				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(true);
					result = getRedirectUrl(query);
				});
				it('should call the function', () => {
					expect(isQueryModeEdit).toHaveBeenCalledWith(query);
				});
				it('should return the url', () => {
					expect(result).toEqual('check-your-deadline-item');
				});
			});
			describe('and the query does not have a mode that is set to edit', () => {
				let result;
				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(false);
					result = getRedirectUrl(query);
				});
				it('should call the function', () => {
					expect(isQueryModeEdit).toHaveBeenCalledWith(query);
				});
				it('should return the url', () => {
					expect(result).toEqual('select-upload-evidence-or-comment');
				});
			});
		});
	});
});
