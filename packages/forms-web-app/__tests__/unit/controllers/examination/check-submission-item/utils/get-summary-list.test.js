const {
	getSummaryList
} = require('../../../../../../src/controllers/examination/check-submission-item/utils/get-summary-list');

let {
	getSummaryListItemEnterComment,
	getSummaryListItemSubmissionItem,
	getSummaryListItemEvidenceOrComment,
	getSummaryListItemSelectFile,
	getSummaryListItemPersonalInformation,
	getSummaryListItemPersonalInformationWhich
} = require('../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item');
let {
	personalInformationWhichIsValid
} = require('../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/is-valid');
let {
	getActiveSubmissionItem
} = require('../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock(
	'../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item',
	() => ({
		getSummaryListItemEnterComment: jest.fn(),
		getSummaryListItemSubmissionItem: jest.fn(),
		getSummaryListItemEvidenceOrComment: jest.fn(),
		getSummaryListItemSelectFile: jest.fn(),
		getSummaryListItemPersonalInformation: jest.fn(),
		getSummaryListItemPersonalInformationWhich: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/is-valid',
	() => ({
		personalInformationWhichIsValid: jest.fn()
	})
);
jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));

const mockSubmissionItemValue = 'mock submission item value';
const mockActiveSubmissionTypeValue = 'mock submission type value';
const mockPersonalInformationValue = 'mock personal information value';
const mockSelectFileValue = 'mock select file value';
const mockEnterCommentValue = 'mock enter comment value';
const mockPersonalInformationWhichValue = 'mock personal information which value';

describe('controllers/examination/enter-comment/utils/get-summary-list', () => {
	describe('#getSummaryList', () => {
		describe('When getting the summary list items for the check submission item page', () => {
			beforeEach(() => {
				getSummaryListItemSubmissionItem.mockReturnValue(mockSubmissionItemValue);
				getSummaryListItemSelectFile.mockReturnValue(mockSelectFileValue);
				getSummaryListItemEnterComment.mockReturnValue(mockEnterCommentValue);
				getSummaryListItemEvidenceOrComment.mockReturnValue(mockActiveSubmissionTypeValue);
				getSummaryListItemPersonalInformation.mockReturnValue(mockPersonalInformationValue);
				getSummaryListItemPersonalInformationWhich.mockReturnValue(
					mockPersonalInformationWhichValue
				);
				personalInformationWhichIsValid.mockReturnValue(false);
			});
			describe('and there is no select file summary item', () => {
				describe('and there is a comment', () => {
					let result;
					beforeEach(() => {
						getActiveSubmissionItem.mockReturnValue({ comment: 'mock comment' });
						result = getSummaryList();
					});

					it('should return an array of summary list items', () => {
						expect(result).toEqual({
							summaryList: [
								mockSubmissionItemValue,
								mockActiveSubmissionTypeValue,
								mockEnterCommentValue,
								mockPersonalInformationValue
							]
						});
					});
				});
			});
			describe('and the submission item has files', () => {
				describe('and the submission item does not have a comment', () => {
					let result;
					beforeEach(() => {
						getActiveSubmissionItem.mockReturnValue({ files: ['mock file 1', 'mock file 2'] });
						result = getSummaryList();
					});
					it('should return an array of summary list items', () => {
						expect(result).toEqual({
							summaryList: [
								mockSubmissionItemValue,
								mockActiveSubmissionTypeValue,
								mockSelectFileValue,
								mockPersonalInformationValue
							]
						});
					});
				});
				describe('and there is a comment', () => {
					beforeEach(() => {
						getActiveSubmissionItem.mockReturnValue({
							comment: 'mock comment',
							files: ['mock file 1', 'mock file 2']
						});
					});
					describe('and the comment or files do NOT contain personal information', () => {
						let result;
						beforeEach(() => {
							result = getSummaryList();
						});
						it('should return an array of summary list items', () => {
							expect(result).toEqual({
								summaryList: [
									mockSubmissionItemValue,
									mockActiveSubmissionTypeValue,
									mockSelectFileValue,
									mockEnterCommentValue,
									mockPersonalInformationValue
								]
							});
						});
					});
					describe('and the comment or files do contain personal information', () => {
						let result;
						beforeEach(() => {
							personalInformationWhichIsValid.mockReturnValue(true);
							result = getSummaryList();
						});
						it('should return an array of summary list items', () => {
							expect(result).toEqual({
								summaryList: [
									mockSubmissionItemValue,
									mockActiveSubmissionTypeValue,
									mockSelectFileValue,
									mockEnterCommentValue,
									mockPersonalInformationValue,
									mockPersonalInformationWhichValue
								]
							});
						});
					});
				});
			});
		});
	});
});
