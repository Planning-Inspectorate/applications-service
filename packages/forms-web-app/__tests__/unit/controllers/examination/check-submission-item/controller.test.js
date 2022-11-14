const {
	getCheckSubmissionItem
} = require('../../../../../src/controllers/examination/check-submission-item/controller');

let {
	getBackLinkUrl
} = require('../../../../../src/controllers/examination/check-submission-item/utils/get-back-link-url');
let {
	getPageData
} = require('../../../../../src/controllers/examination/check-submission-item/utils/get-page-data');
let {
	getSummaryList
} = require('../../../../../src/controllers/examination/check-submission-item/utils/get-summary-list');

jest.mock(
	'../../../../../src/controllers/examination/check-submission-item/utils/get-back-link-url',
	() => ({
		getBackLinkUrl: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/check-submission-item/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/check-submission-item/utils/get-summary-list',
	() => ({
		getSummaryList: jest.fn()
	})
);

describe('/controllers/examination/check-submission-item/controller', () => {
	const mockSession = 'mock session';
	const res = {
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	const req = {
		session: mockSession
	};

	const getMockPageDataValue = { mockPageDataValue: 'get mock page data value' };
	const getMockBackLinkUrlValue = { mockBackLinkUrlValue: 'get mock back link URL value' };
	const getMockSummaryListValue = { mockSummaryListValue: 'get mock summary list value' };

	describe('#getCheckSubmissionItem', () => {
		describe('When rendering check submission item page', () => {
			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(getMockPageDataValue);
					getBackLinkUrl.mockReturnValue(getMockBackLinkUrlValue);
					getSummaryList.mockReturnValue(getMockSummaryListValue);
					getCheckSubmissionItem(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/check-submission-item', {
						...getPageData(),
						...getMockBackLinkUrlValue,
						...getMockSummaryListValue
					});
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getCheckSubmissionItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
