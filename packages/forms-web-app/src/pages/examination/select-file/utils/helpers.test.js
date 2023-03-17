let config = require('../../../../config');
const {
	calcMaxFileSizeLimit,
	mapUploadedFilesToSummaryList,
	addHrefToErrorSummary,
	mapErrorMessage,
	makeIntoArray,
	mapMultipleFileUploadErrors
} = require('./helpers');

jest.mock('../../../../config');

describe('examination/file-upload/utils', () => {
	describe('#calcMaxFileSizeLimit', () => {
		describe('when calculating the max file size limit using the default limit', () => {
			const result = calcMaxFileSizeLimit();
			it('should return the default calculated max file size', () => {
				expect(result).toEqual(52428800);
			});
		});

		describe('when calculating the max file size limit using an config override limit', () => {
			config.fileUpload.maxFileSizeInMb = 20;

			const result = calcMaxFileSizeLimit();
			it('should return the default calculated max file size', () => {
				expect(result).toEqual(20971520);
			});
		});
	});

	describe('#mapUploadedFilesToSummaryList', () => {
		describe('when mapping an array of uploaded files to a govuk summary list ', () => {
			describe('and there are no files in the array', () => {
				const result = mapUploadedFilesToSummaryList([]);
				it('should return an empty array', function () {
					expect(result).toEqual([]);
				});
			});
			describe('and there are files in the array', () => {
				const fileItem = { fileName: 'file name', uniqueFileName: 'unique file name' };
				const fileArray = [fileItem];
				const result = mapUploadedFilesToSummaryList(fileArray);
				it('should return an array of files', function () {
					expect(result).toEqual([
						{
							deleteButton: { text: 'Remove' },
							fileName: 'unique file name',
							message: { html: 'file name' },
							originalFileName: 'file name'
						}
					]);
				});
			});
		});
	});
	describe('#addHrefToErrorSummary', () => {
		describe('When an error summary has more than 1 element', () => {
			const errorSummary = [{ text: 'error 1' }];
			const href = 'mock href';
			const result = addHrefToErrorSummary(errorSummary, href);
			it('should add the href to the error summary message', () => {
				expect(result).toEqual([
					{
						text: 'error 1',
						href
					}
				]);
			});
		});
		describe('When an error summary has no elements', () => {
			const errorSummary = [];
			const href = 'mock href';
			const result = addHrefToErrorSummary(errorSummary, href);
			it('should return an empty array', () => {
				expect(result).toEqual([]);
			});
		});
	});
	describe('#makeIntoArray', () => {
		describe('When a variable needs to be in array', () => {
			describe('and the variable is an array already', () => {
				const array = ['item'];
				const result = makeIntoArray(array);
				it('should return an array', function () {
					expect(result).toEqual(array);
				});
			});
			describe('and the variable is not already an array', () => {
				const item = 'not an array';
				const result = makeIntoArray(item);
				it('should return an array', function () {
					expect(result).toEqual([item]);
				});
			});
		});
	});
	describe('#mapErrorMessage', () => {
		describe('When an error message for govuk needs to be created', () => {
			const errorMessage = 'mock error message';
			const result = mapErrorMessage(errorMessage);
			it('should return the error message in the govuk format', () => {
				expect(result).toEqual({
					errorMessage: {
						text: errorMessage
					},
					errorSummary: [
						{
							text: errorMessage
						}
					]
				});
			});
		});
	});
	describe('#mapMultipleFileUploadErrors', () => {
		describe('When error messages for file upload are needed', () => {
			describe('and there are errors', () => {
				const errors = ['error 1', 'error-2'];
				const result = mapMultipleFileUploadErrors(errors);
				it('should return an object containing an error message in html that has a line break', () => {
					expect(result.errorMessage).toEqual({ html: 'error 1<br>error-2<br>' });
				});
				it('should return an object containing an array of summary errors', () => {
					expect(result.errorSummary).toEqual([
						{
							text: 'error 1'
						},
						{
							text: 'error-2'
						}
					]);
				});
			});
			describe('and there are no errors', () => {
				const errors = [];
				const result = mapMultipleFileUploadErrors(errors);
				it('should return an empty error object', () => {
					expect(result).toEqual({
						errorMessage: false,
						errorSummary: []
					});
				});
			});
		});
	});
});
