const { getPersonalInformationWhichName } = require('./get-name');

let { getSubmissionItemType } = require('../../../../_session/submission-items-session');

jest.mock('../../../../_session/submission-items-session', () => ({
	getSubmissionItemType: jest.fn()
}));

describe('controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/get-name', () => {
	describe('#getPersonalInformationWhichName', () => {
		describe('When calling get personal information which name function', () => {
			describe('and the submission type is equal to "upload"', () => {
				let result;

				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('upload');
					result = getPersonalInformationWhichName();
				});

				it('should return', () => {
					expect(result).toEqual('Documents containing personal information');
				});
			});

			describe('and the submission type is equal to "both"', () => {
				let result;

				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('both');
					result = getPersonalInformationWhichName();
				});

				it('should return', () => {
					expect(result).toEqual('Documents or comments containing personal information');
				});
			});

			describe('and the submission type does not match an option', () => {
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('');
				});

				it('should throw an error', () => {
					expect(() => getPersonalInformationWhichName()).toThrow(
						'Submission item type does not match an option'
					);
				});
			});
		});
	});
});
