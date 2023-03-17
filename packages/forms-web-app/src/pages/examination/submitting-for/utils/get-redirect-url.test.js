const { getRedirectUrl } = require('./get-redirect-url');

const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

const mockQuery = { mock: 'query' };

describe('examination/submitting-for/utils/get-back-link-url', () => {
	describe('#getRedirectUrl', () => {
		describe('When getting the redirect URL for the submitting for page', () => {
			beforeEach(() => {
				isQueryModeEdit.mockReturnValue(false);
			});
			describe('and the mode is edit', () => {
				let result;
				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(true);
					result = getRedirectUrl(mockQuery, '');
				});
				it('should return the check your answers URL', () => {
					expect(result).toEqual('/examination/check-your-answers');
				});
			});
			describe('and the selected submitting for value is myself', () => {
				let result;
				beforeEach(() => {
					result = getRedirectUrl(mockQuery, 'myself');
				});
				it('should return the your name URL', () => {
					expect(result).toEqual('/examination/your-name');
				});
			});
			describe('and the selected submittin for value is organisation', () => {
				let result;
				beforeEach(() => {
					result = getRedirectUrl(mockQuery, 'organisation');
				});
				it('should return the organisation name URL', () => {
					expect(result).toEqual('/examination/your-organisation-name');
				});
			});
			describe('and the selected submittin for value is agent', () => {
				let result;
				beforeEach(() => {
					result = getRedirectUrl(mockQuery, 'agent');
				});
				it('should return the agent name URL', () => {
					expect(result).toEqual('/examination/name-of-person-or-group');
				});
			});
		});
	});
});
