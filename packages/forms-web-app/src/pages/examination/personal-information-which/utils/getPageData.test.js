const { getPageData } = require('./getPageData');
const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getFileOptions, getCommentOption } = require('./getOptions');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslations_EN = require('../../_translations/en.json');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));
jest.mock('./getOptions', () => ({
	getFileOptions: jest.fn(),
	getCommentOption: jest.fn()
}));

const i18n = mockI18n({ examination: examinationTranslations_EN });

describe('examination/personal-information-which/utils/getPageData', () => {
	describe('#getPageData', () => {
		describe('When the page data is for the personal information comment and files page', () => {
			let result;
			const mockSession = {};
			const mockActiveSubmissionItem = { submissionType: 'both' };
			const mockFileOptions = ['file options'];
			const mockCommentOption = 'comment option';
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
				getFileOptions.mockReturnValue(mockFileOptions);
				getCommentOption.mockReturnValue(mockCommentOption);
				result = getPageData(i18n, mockSession);
			});
			it('should return the comment and files page data (both)', () => {
				expect(result).toEqual({
					backLinkUrl: 'comment-file-has-personal-information-or-not',
					id: 'examination-personal-information-which-comment-files',
					pageTitle: 'Which files and comments contain personal information?',
					radioOptions: ['comment option', 'file options'],
					route: 'select-which-files-comments-have-personal-information',
					title: 'Which files and comments contain personal information?'
				});
			});
		});
		describe('When the page data is for the personal information files page', () => {
			let result;
			const mockSession = {};
			const mockActiveSubmissionItem = { submissionType: 'other' };
			const mockFileOptions = ['file options'];
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItem);
				getFileOptions.mockReturnValue(mockFileOptions);
				result = getPageData(i18n, mockSession);
			});
			it('should return the files page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'files-have-personal-information-or-not',
					id: 'examination-personal-information-which-files',
					pageTitle: 'Which files contain personal information?',
					radioOptions: ['file options'],
					route: 'which-files-have-personal-information-or-not',
					title: 'Which files contain personal information?'
				});
			});
		});
	});
});
