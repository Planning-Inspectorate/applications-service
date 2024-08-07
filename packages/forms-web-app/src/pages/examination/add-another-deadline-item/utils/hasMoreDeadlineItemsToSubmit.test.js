const { hasMoreDeadlineItemsToSubmit } = require('./hasMoreDeadlineItemsToSubmit');

const { getDeadlineItemStillToSubmit } = require('../../_session/deadlineItems-session');
const { getRedirectUrl } = require('./get-redirect-url');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({ examination: examinationTranslationsEN });

jest.mock('../../_session/deadlineItems-session', () => ({
	getDeadlineItemStillToSubmit: jest.fn()
}));
jest.mock('./get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));

describe('#hasMoreDeadlineItemsToSubmit', () => {
	describe('When working checking if there are more deadline items to submit', () => {
		describe('and there are no more deadline items to submit', () => {
			const mockSession = 'mock session';
			const mockLink = 'mock continue link';
			let result;
			beforeEach(() => {
				getDeadlineItemStillToSubmit.mockReturnValue([]);
				getRedirectUrl.mockReturnValue(mockLink);
				result = hasMoreDeadlineItemsToSubmit(i18n, mockSession);
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
				result = hasMoreDeadlineItemsToSubmit(i18n, mockSession);
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
