const { getSection51AdviceDetail } = require('./section-51-advice-detail.controller');

const { getAdviceDetailData } = require('../../../../services/advice.service');

jest.mock('../../../../services/advice.service', () => ({
	getAdviceDetailData: jest.fn()
}));

describe('#getSection51AdviceDetail', () => {
	describe('When getting the section 51 advice detail page', () => {
		let mockReq;
		let mockRes;

		beforeEach(() => {
			mockReq = {
				get: jest.fn(() => 's51advice/mock-referer-value'),
				params: {
					id: 'mock advice detail id'
				}
			};
			mockRes = {
				locals: { caseRef: 'mock-case-ref' },
				render: jest.fn(),
				status: jest.fn(() => mockRes)
			};
		});
		describe('and there are no errors', () => {
			beforeEach(async () => {
				getAdviceDetailData.mockReturnValue({
					adviceGiven: 'mock advice given',
					attachments: [
						{ documentURI: 'mock document URI 1', mime: 'application/pdf' },
						{ documentURI: 'mock document URI 2', mime: 'application/msword' }
					],
					dateAdviceGiven: '2023-01-01',
					enquiryDetail: 'mock enquiry detail',
					enquiryMethod: 'mock enquiry method',
					organisation: 'mock organisation'
				});
				await getSection51AdviceDetail(mockReq, mockRes);
			});
			it('should call the correct template with the page data', () => {
				expect(mockRes.render).toHaveBeenCalledWith(
					'projects/section-51/section-51-advice-detail/index.njk',
					{
						activeId: 'section-51',
						adviceGiven: 'mock advice given',
						attachments: [
							{ text: 'View advice (PDF)', url: 'mock document URI 1' },
							{ text: 'View advice (Word)', url: 'mock document URI 2' }
						],
						backToListUrl: 's51advice/mock-referer-value',
						breadcrumbsItems: [
							{ href: '/projects/mock-case-ref/s51advice', text: 'Section 51 advice' },
							{ href: undefined, text: 'Advice in detail' }
						],
						enquirySummaryList: [
							{ key: { text: 'Author' }, value: { text: 'mock organisation' } },
							{ key: { text: 'Date published' }, value: { text: '1 January 2023' } },
							{ key: { text: 'Enquiry type' }, value: { text: 'mock enquiry method' } }
						],
						enquiryText: 'mock enquiry detail',
						pageTitle: 'mock enquiry detail',
						title: 'mock enquiry detail'
					}
				);
			});
		});
		describe('and an id is not found', () => {
			beforeEach(async () => {
				getAdviceDetailData.mockRejectedValue(new Error('NOT_FOUND'));
				await getSection51AdviceDetail(mockReq, mockRes);
			});
			it('should set the status to 404', () => {
				expect(mockRes.status).toHaveBeenCalledWith(404);
			});
			it('should render the not found error page', () => {
				expect(mockRes.render).toHaveBeenCalledWith('error/not-found');
			});
		});
		describe('and there is an unhandled error', () => {
			beforeEach(async () => {
				getAdviceDetailData.mockRejectedValue(new Error('something went wrong'));
				await getSection51AdviceDetail(mockReq, mockRes);
			});
			it('should set the status to 500', () => {
				expect(mockRes.status).toHaveBeenCalledWith(500);
			});
			it('should render the unhandled exception error page', () => {
				expect(mockRes.render).toHaveBeenCalledWith('error/unhandled-exception');
			});
		});
	});
});
