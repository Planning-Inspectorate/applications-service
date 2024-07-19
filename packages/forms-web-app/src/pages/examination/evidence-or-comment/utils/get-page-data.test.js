const { getPageData } = require('./get-page-data');

let { getActiveSubmissionItem } = require('../../_session/submission-items-session');
let { markActiveChecked } = require('../../_utils/mark-active-checked');
const { mockI18n } = require('../../../_mocks/i18n');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));
jest.mock('../../_utils/mark-active-checked', () => ({
	markActiveChecked: jest.fn()
}));

const examinationTranslationsEN = require('../../_translations/en.json');

const req = {
	i18n: mockI18n({
		examination: examinationTranslationsEN
	}),
	query: {},
	session: {}
};

const mockActiveSubmissionItemValue = {
	submissionItem: 'mock submission item value'
};
const mockMarkActiveAsCheckedValue = 'mock mark active as checked value';

const pageData = {
	backLinkUrl: 'select-deadline-item',
	submissionItemTitle: mockActiveSubmissionItemValue.submissionItem,
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
	]
};

describe('examination/evidence-or-comment/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting page data for the evidence or comment page', () => {
			describe('and the session does not contain a submission type value', () => {
				let result;

				beforeEach(() => {
					getActiveSubmissionItem.mockReturnValue(mockActiveSubmissionItemValue);
					result = getPageData(req.i18n, req.query, req.session);
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
					result = getPageData(req.i18n, req.query, req.session);
				});
				it('should return the page data', () => {
					expect(result).toEqual({ ...pageData, options: mockMarkActiveAsCheckedValue });
				});
			});
		});
	});
});
