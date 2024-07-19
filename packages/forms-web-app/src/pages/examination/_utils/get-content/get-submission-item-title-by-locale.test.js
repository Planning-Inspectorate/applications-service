const { getSubmissionItemTitleByLocale } = require('./get-submission-item-title-by-locale');

const { mockI18n } = require('../../../_mocks/i18n');

const mockSession = {
	examination: {
		activeSubmissionItemId: 'mock-item-id',
		submissionItems: [
			{
				itemId: 'mock-item-id',
				submissionItem: 'mock submission item title English',
				submissionItemWelsh: 'mock submission item title Welsh',
				submissionType: null
			}
		]
	}
};

describe('pages/examination/_utils/get-content/get-submission-item-title-by-locale', () => {
	describe('#getSubmissionItemTitleByLocale', () => {
		describe('When the selected locale is English', () => {
			const submissionItemTitleByLocale = getSubmissionItemTitleByLocale(mockI18n({}), mockSession);

			it('should return the English submission item title', () => {
				expect(submissionItemTitleByLocale).toEqual('mock submission item title English');
			});
		});

		describe('When the selected locale is Welsh', () => {
			const submissionItemTitleByLocale = getSubmissionItemTitleByLocale(
				mockI18n({}, 'cy'),
				mockSession
			);

			it('should return the Welsh submission item title', () => {
				expect(submissionItemTitleByLocale).toEqual('mock submission item title Welsh');
			});
		});
	});
});
