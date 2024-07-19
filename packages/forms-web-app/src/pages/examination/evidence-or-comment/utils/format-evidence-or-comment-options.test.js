const { formatEvidenceOrCommentOptions } = require('./format-evidence-or-comment-options');

const { mockI18n } = require('../../../_mocks/i18n');
const evidenceOrCommentTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: evidenceOrCommentTranslationsEN
});

describe('pages/examination/evidence-or-comment/utils/format-evidence-or-comment-options', () => {
	describe('#formatEvidenceOrCommentOptions', () => {
		describe('When getting the options for the evidence or comment page', () => {
			describe('and the user has not previously selected an option', () => {
				let result;

				const mockSession = {
					examination: {
						activeSubmissionItemId: 'mock-item-id',
						submissionItems: [
							{
								itemId: 'mock-item-id',
								submissionType: null
							}
						]
					}
				};

				beforeEach(() => {
					result = formatEvidenceOrCommentOptions(i18n, mockSession);
				});

				it('should return the options for the submitting for page', () => {
					expect(result).toEqual([
						{ text: 'Make a comment', value: 'comment' },
						{ text: 'Upload files', value: 'upload' },
						{ text: 'Make a comment and upload files', value: 'both' }
					]);
				});
			});

			describe('and the user has previously selected an option', () => {
				let result;

				const mockSession = {
					examination: {
						activeSubmissionItemId: 'mock-item-id',
						submissionItems: [
							{
								itemId: 'mock-item-id',
								submissionType: 'both'
							}
						]
					}
				};

				beforeEach(() => {
					result = formatEvidenceOrCommentOptions(i18n, mockSession);
				});

				it('should return the options for the submitting for page', () => {
					expect(result).toEqual([
						{ text: 'Make a comment', value: 'comment' },
						{ text: 'Upload files', value: 'upload' },
						{ checked: 'checked', text: 'Make a comment and upload files', value: 'both' }
					]);
				});
			});
		});
	});
});
