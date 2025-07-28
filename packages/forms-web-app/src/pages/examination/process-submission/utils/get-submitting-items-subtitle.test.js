const { getSubmittingItemsSubtitle } = require('./get-submitting-items-subtitle');

const { getAllCommentsAndFilesLength } = require('./get-all-comments-and-files-length');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslationsEN
});

jest.mock('./get-all-comments-and-files-length', () => ({
	getAllCommentsAndFilesLength: jest.fn()
}));

describe('examination/process-submission/utils/get-submitting-items-subtitle', () => {
	describe('#getSubmittingItemsSubtitle', () => {
		describe('When getting the submitting items subtitle for the processing submission page', () => {
			describe('and there is one submission item', () => {
				let result;
				beforeEach(() => {
					getAllCommentsAndFilesLength.mockReturnValue(1);
					result = getSubmittingItemsSubtitle(i18n);
				});
				it('should return the subtitle', () => {
					expect(result).toEqual('We are processing 1 item');
				});
			});
			describe('and there is more than one submission item', () => {
				let result;
				beforeEach(() => {
					getAllCommentsAndFilesLength.mockReturnValue(2);
					result = getSubmittingItemsSubtitle(i18n);
				});
				it('should return the subtitle', () => {
					expect(result).toEqual('We are processing 2 items');
				});
			});
		});
	});
});
