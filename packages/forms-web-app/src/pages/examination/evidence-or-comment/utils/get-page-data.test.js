const { getPageData } = require('./get-page-data');

let { getActiveSubmissionItem } = require('../../_session/submission-items-session');
let { markActiveChecked } = require('../../_utils/mark-active-checked');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));
jest.mock('../../_utils/mark-active-checked', () => ({
	markActiveChecked: jest.fn()
}));

const req = {
	query: {},
	session: {}
};

const mockActiveSubmissionItemValue = {
	submissionItem: 'mock submission item value'
};
const mockMarkActiveAsCheckedValue = 'mock mark active as checked value';

const pageData = {
	backLinkUrl: 'select-deadline-item',
	activeSubmissionItemTitle: mockActiveSubmissionItemValue.submissionItem,
	id: 'examination-evidence-or-comment',
	options: [
		{
			text: 'Make a comment',
			value: 'comment'
		},
		{
			text: 'Upload files',
			value: 'upload'
		},
		{
			text: 'Make a comment and upload files',
			value: 'both'
		}
	],
	pageTitle: 'How would you like to submit comments?',
	title: 'How would you like to submit comments?'
};

describe('examination/evidence-or-comment/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting page data for the evidence or comment page', () => {
			describe('and the session does not contain a submission type value', () => {
				let result;
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItemValue);
					result = getPageData(req.query, req.session);
				});
				it('should return the page data', () => {
					expect(result).toEqual(pageData);
				});
			});
			describe('and the session does contain a submission type value', () => {
				let result;
				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue({
						...mockActiveSubmissionItemValue,
						submissionType: 'comment'
					});
					markActiveChecked.mockReturnValue(mockMarkActiveAsCheckedValue);
					result = getPageData(req.query, req.session);
				});
				it('should return the page data', () => {
					expect(result).toEqual({ ...pageData, options: mockMarkActiveAsCheckedValue });
				});
			});
		});
	});
});
