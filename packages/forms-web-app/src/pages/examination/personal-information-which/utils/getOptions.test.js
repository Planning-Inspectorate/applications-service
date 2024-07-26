const { getCommentOption, getFileOptions } = require('./getOptions');
const { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslations_EN = require('../../_translations/en.json');

jest.mock('../../_utils/file-upload/fileSessionManagement', () => ({
	getUploadedFilesFromSession: jest.fn()
}));

const i18n = mockI18n({ examination: examinationTranslations_EN });

describe('examination/personal-information-which/utils/getOptions', () => {
	describe('#getFileOptions', () => {
		describe('When getting the files radio options', () => {
			describe('and any file does not have / have a personal information flag', () => {
				let result;
				const mockSession = {};
				const mockFiles = [
					{
						fileName: 'should be checked',
						uniqueFileName: 'unique file name 1',
						personalInformation: 'yes'
					},
					{
						fileName: 'should not be checked',
						uniqueFileName: 'unique file name 2',
						personalInformation: 'no'
					},
					{ fileName: 'should not be checked 2', uniqueFileName: 'unique file name 3' }
				];
				beforeEach(() => {
					getUploadedFilesFromSession.mockReturnValue(mockFiles);
					result = getFileOptions(mockSession);
				});
				it('should mark checked if the personal information flag is set', () => {
					expect(result[0]).toEqual({
						checked: true,
						text: 'should be checked',
						value: 'unique file name 1'
					});
				});
				it('should NOT mark checked if the personal information flag is set to no', () => {
					expect(result[1]).toEqual({
						checked: false,
						text: 'should not be checked',
						value: 'unique file name 2'
					});
				});
				it('should NOT mark as checked if no personal information flag', () => {
					expect(result[2]).toEqual({
						checked: false,
						text: 'should not be checked 2',
						value: 'unique file name 3'
					});
				});
			});
		});
	});

	describe('#getCommentOption', () => {
		describe('When getting the comment radio option', () => {
			describe('and the the personal information flag is set', () => {
				const result = getCommentOption(i18n, { commentPersonalInformation: 'yes' });
				it('should check the option', () => {
					expect(result).toEqual({
						text: 'My comment',
						value: 'comment',
						checked: true
					});
				});
			});
			describe('and the the personal information flag is NOT set', () => {
				const result = getCommentOption(i18n, {});
				it('should NOT check the option', () => {
					expect(result).toEqual({
						text: 'My comment',
						value: 'comment',
						checked: false
					});
				});
			});
		});
	});
});
