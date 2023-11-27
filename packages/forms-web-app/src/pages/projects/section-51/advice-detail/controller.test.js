const { getSection51AdviceDetailController } = require('./controller');

const { getAdviceDetailData } = require('../../../../services/advice.service');
const { adviceList } = require('../__mocks__/fixtures');

jest.mock('../../../../services/advice.service', () => ({
	getAdviceDetailData: jest.fn()
}));

describe('pages/projects/section-51/advice-detail/controller', () => {
	describe('#getSection51AdviceDetailController', () => {
		describe('When getting the section 51 advice detail page', () => {
			let mockReq;
			let mockRes;
			let mockNext;

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
				mockNext = jest.fn();
			});
			describe('and there are no errors', () => {
				beforeEach(async () => {
					getAdviceDetailData.mockReturnValue(adviceList[0]);
					await getSection51AdviceDetailController(mockReq, mockRes, mockNext);
				});
				it('should call the correct template with the page data', () => {
					expect(mockRes.render).toHaveBeenCalledWith(
						'projects/section-51/advice-detail/view.njk',
						{
							activeId: 'section-51',
							adviceGiven: 'mock advice given',
							attachments: [
								{ text: 'View advice (PDF)', url: 'mock document URI 1' },
								{ text: 'View advice (Word)', url: 'mock document URI 2' }
							],
							backToListUrl: '/projects/mock-case-ref/s51advice',
							breadcrumbsItems: [
								{ href: '/projects/mock-case-ref/s51advice', text: 'Section 51 advice' },
								{ href: undefined, text: 'Advice in detail' }
							],
							enquirySummaryList: [
								{ key: { text: 'From' }, value: { text: 'mock organisation' } },
								{ key: { text: 'Date advice given' }, value: { text: '1 January 2023' } },
								{ key: { text: 'Enquiry type' }, value: { text: 'mock enquiry method' } }
							],
							enquiryText: 'mock enquiry detail',
							pageTitle: 'mock enquiry detail',
							title: 'Advice to mock organisation'
						}
					);
				});
			});
			describe('and an id is not found', () => {
				beforeEach(async () => {
					getAdviceDetailData.mockRejectedValue(new Error('NOT_FOUND'));
					await getSection51AdviceDetailController(mockReq, mockRes, mockNext);
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
					getAdviceDetailData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					await getSection51AdviceDetailController(mockReq, mockRes, mockNext);
				});
				it('should render the unhandled exception error page', () => {
					expect(mockNext).toHaveBeenCalledWith(new Error('something went wrong'));
				});
			});
		});
	});
});
