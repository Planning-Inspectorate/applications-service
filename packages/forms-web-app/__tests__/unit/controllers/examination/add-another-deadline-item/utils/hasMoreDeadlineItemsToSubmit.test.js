const {
	hasMoreDeadlineItemsToSubmit
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/hasMoreDeadlineItemsToSubmit');
const {
	getDeadlineItemStillToSubmit
} = require('../../../../../../src/controllers/examination/session/deadlineItems-session');
const {
	getRedirectUrl
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/get-redirect-url');

jest.mock('../../../../../../src/controllers/examination/session/deadlineItems-session', () => ({
	getDeadlineItemStillToSubmit: jest.fn()
}));

jest.mock(
	'../../../../../../src/controllers/examination/add-another-deadline-item/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);
describe('#hasMoreDeadlineItemsToSubmit', () => {
	describe('When working checking if there are more deadline items to submit', () => {
		describe('and there are no more deadline items to submit', () => {
			const mockSession = 'mock session';
			const mockLink = 'mock continue link';
			let result;
			beforeEach(() => {
				getDeadlineItemStillToSubmit.mockReturnValue([]);
				getRedirectUrl.mockReturnValue(mockLink);
				result = hasMoreDeadlineItemsToSubmit(mockSession);
			});
			it('should return false', () => {
				expect(result).toEqual({
					continueLink: mockLink,
					hasMoreDeadlineItemsToSubmit: false,
					message: 'You have submitted against all available deadline items'
				});
			});
		});
		describe('and there are more deadline items to submit', () => {
			const mockSession = 'mock session';
			const mockLink = 'mock continue link';
			let result;
			beforeEach(() => {
				getDeadlineItemStillToSubmit.mockReturnValue(['mock item']);
				getRedirectUrl.mockReturnValue(mockLink);
				result = hasMoreDeadlineItemsToSubmit(mockSession);
			});
			it('should return false', () => {
				expect(result).toEqual({
					continueLink: mockLink,
					hasMoreDeadlineItemsToSubmit: true,
					message: 'You have submitted against all available deadline items'
				});
			});
		});
	});
});
