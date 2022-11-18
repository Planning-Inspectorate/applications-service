const {
	getListOfFormData
} = require('../../../../../../src/controllers/examination/process-submission/utils/fromDataMappers');
const { expectFormDataKeyValue, expectFormDataFile } = require('./testHelper');

describe('examination/process-submission/utils/fromDataMappers', () => {
	describe('#getListOfFormData', () => {
		describe('When getting a list of form data', () => {
			const examination = {
				hasInterestedPartyNo: 'yes',
				name: 'mock name',
				email: 'mock email',
				title: 'remove me - mock title'
			};
			describe('and the submission items only has a comment', () => {
				const item = {
					comment: 'mock comment',
					submissionItem: 'mock deadline item',
					personalInformation: 'yes'
				};
				let result;
				beforeEach(() => {
					result = getListOfFormData(examination, item);
				});
				it('should add the comment (representation) value and form data as an item on the array', () => {
					const expectedFrom = result[0];
					expectFormDataKeyValue(expectedFrom, 'representation', 'mock comment');
					expectFormDataKeyValue(expectedFrom, 'sensitiveData', 'true', 18);
				});
			});
			describe('and the submission items only has a file', () => {
				const item = {
					files: [
						{
							uploadPath: 'mock-file.json',
							fileName: 'real file name',
							raw: { size: 100, mimetype: 'mock/mime-type' }
						}
					],
					submissionItem: 'mock deadline item'
				};
				let result;
				beforeEach(() => {
					result = getListOfFormData(examination, item);
				});
				it('should add the comment (representation) value and form data as an item on the array', () => {
					const expectedFrom = result[0];
					expectFormDataFile(expectedFrom, 'real file name', 'mock-file.json');
				});
			});
			describe('and there are submission items files and a comment', () => {
				const item = {
					comment: 'mock comment',
					files: [
						{
							uploadPath: 'mock-file.json',
							fileName: 'real file name',
							raw: { size: 100, mimetype: 'mock/mime-type' }
						},
						{
							uploadPath: 'mock-file-2.json',
							fileName: 'real file name 2',
							raw: { size: 3000, mimetype: 'mock/mime-type' },
							personalInformation: 'yes'
						}
					],
					submissionItem: 'mock deadline item'
				};
				let result;
				beforeEach(() => {
					result = getListOfFormData(examination, item);
				});
				it('should add the comment (representation) value and form data as an item on the array', () => {
					const expectedFrom = result[0];
					expectFormDataKeyValue(expectedFrom, 'representation', 'mock comment');
				});
				it('should add file[0] to the array', () => {
					const expectedFrom = result[1];
					expectFormDataFile(expectedFrom, 'real file name', 'mock-file.json');
				});
				it('should add sensitive flag to file[1] form', () => {
					const expectedFrom = result[2];
					expectFormDataKeyValue(expectedFrom, 'sensitiveData', 'true');
					expectFormDataFile(expectedFrom, 'real file name 2', 'mock-file-2.json', 18);
				});
			});
		});
	});
});
