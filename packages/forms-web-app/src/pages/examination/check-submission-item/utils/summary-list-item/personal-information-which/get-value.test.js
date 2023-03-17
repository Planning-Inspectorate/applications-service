const { getPersonalInformationWhichValue } = require('./get-value');

let { getSubmissionItemFiles } = require('../../../../_session/submission-items-session');

jest.mock('../../../../_session/submission-items-session', () => ({
	getSubmissionItemFiles: jest.fn()
}));

describe('examination/check-submission-item/utils/summary-list-item/personal-information-which/get-value', () => {
	describe('#getPersonalInformationWhichValue', () => {
		describe('When getting the value for the personal information which summary list item', () => {
			describe('and there are files that have personal informaion', () => {
				const mockSubmissionFiles = [
					{
						fileName: 'file name 1',
						personalInformation: 'no'
					},
					{
						fileName: 'file name 2',
						personalInformation: 'yes'
					}
				];
				beforeEach(() => {
					getSubmissionItemFiles.mockReturnValue(mockSubmissionFiles);
				});
				describe('and there is a comment that has personal information', () => {
					let result;
					beforeEach(() => {
						const mockSubmissionItem = {};
						mockSubmissionItem.commentPersonalInformation = 'yes';
						result = getPersonalInformationWhichValue(mockSubmissionItem);
					});
					it('should return a list', () => {
						expect(result).toEqual(
							'<ul class="govuk-list"><li>My comment</li><li>file name 2</li></ul>'
						);
					});
				});
				describe('and there is a comment that does NOT have personal information', () => {
					let result;
					beforeEach(() => {
						const mockSubmissionItem = {};
						mockSubmissionItem.commentPersonalInformation = 'no';
						result = getPersonalInformationWhichValue(mockSubmissionItem);
					});
					it('should return a list', () => {
						expect(result).toEqual('<ul class="govuk-list"><li>file name 2</li></ul>');
					});
				});
			});
			describe('and there are files that do NOT have personal informaion', () => {
				const mockSubmissionFiles = [
					{
						fileName: 'file name 1',
						personalInformation: 'no'
					},
					{
						fileName: 'file name 2',
						personalInformation: 'no'
					}
				];
				beforeEach(() => {
					getSubmissionItemFiles.mockReturnValue(mockSubmissionFiles);
				});
				describe('and there is a comment that does NOT have personal information', () => {
					const mockSubmissionItem = {};
					beforeEach(() => {
						mockSubmissionItem.commentPersonalInformation = 'no';
					});
					it('should throw an error', () => {
						expect(() => getPersonalInformationWhichValue(mockSubmissionItem)).toThrow(
							'Submission item does not contain any files or comment with personal information'
						);
					});
				});
			});
		});
	});
});
