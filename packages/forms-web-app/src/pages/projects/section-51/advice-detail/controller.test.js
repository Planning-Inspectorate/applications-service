const { getSection51AdviceDetailController } = require('./controller');

const { getAdviceDetailData } = require('../../../../services/advice.service');
const { adviceList } = require('../__mocks__/fixtures');

const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../locales/en/common.json');
const section51Translations_EN = require('../_translations/en.json');
const commonTranslations_CY = require('../../../../locales/cy/common.json');
const section51Translations_CY = require('../_translations/cy.json');

jest.mock('../../../../services/advice.service', () => ({
	getAdviceDetailData: jest.fn()
}));

describe('pages/projects/section-51/advice-detail/controller', () => {
	describe('#getSection51AdviceDetailController', () => {
		describe('When getting the section 51 advice detail page', () => {
			describe('and there are no errors', () => {
				let mockReq;
				let mockRes;
				let mockNext;

				beforeEach(() => {
					mockReq = {
						get: jest.fn(() => 's51advice/mock-referer-value'),
						session: {}
					};
					mockRes = {
						render: jest.fn(),
						status: jest.fn(() => mockRes)
					};
					mockNext = jest.fn();

					getAdviceDetailData.mockReturnValue(adviceList[0]);
				});

				describe('and the user is on the section 51 detail page in English', () => {
					beforeEach(async () => {
						mockReq = {
							...mockReq,
							params: {
								case_ref: 'mock-case-ref',
								id: 'mock-advice-detail-id',
								session: {}
							},
							path: '/projects/mock-case-ref/s51advice/mock-advice-detail-id',
							i18n: mockI18n({
								common: commonTranslations_EN,
								section51: section51Translations_EN
							})
						};
						await getSection51AdviceDetailController(mockReq, mockRes, mockNext);
					});

					it('should call the section 51 advice detail template with the page data', () => {
						expect(mockRes.render).toHaveBeenCalledWith(
							'projects/section-51/advice-detail/view.njk',
							{
								activeId: 'section-51',
								adviceGiven: '<p>mock advice given</p>',
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
									{ key: { text: 'Enquiry type' }, value: { text: 'Email' } }
								],
								enquiryText: '<p>mock enquiry detail</p>',
								pageTitle: 'mock enquiry detail',
								title: 'Advice to mock organisation'
							}
						);
					});
				});

				describe('and the user is on the register of advice detail page in Welsh', () => {
					beforeEach(async () => {
						mockReq = {
							...mockReq,
							params: {
								id: 'mock-advice-detail-id'
							},
							path: '/register-of-advice/mock-advice-detail-id',
							i18n: mockI18n(
								{
									common: commonTranslations_CY,
									section51: section51Translations_CY
								},
								'cy'
							),
							session: {}
						};
						await getSection51AdviceDetailController(mockReq, mockRes, mockNext);
					});

					it('should call the register of advice detail template with the page data', () => {
						expect(mockRes.render).toHaveBeenCalledWith('register-of-advice/detail/view.njk', {
							activeId: 'section-51',
							adviceGiven: '<p>mock advice given in Welsh</p>',
							attachments: [
								{ text: 'Gweld y cyngor (PDF)', url: 'mock document URI 1' },
								{ text: 'Gweld y cyngor (Word)', url: 'mock document URI 2' }
							],
							backToListUrl: '/register-of-advice',
							breadcrumbsItems: null,
							enquirySummaryList: [
								{ key: { text: 'Oddiwrth' }, value: { text: 'mock organisation' } },
								{
									key: { text: 'Y dyddiad y rhoddwyd y cyngor' },
									value: { text: '1 Ionawr 2023' }
								},
								{ key: { text: 'Math o ymholiad' }, value: { text: 'Email' } }
							],
							enquiryText: '<p>mock enquiry detail in Welsh</p>',
							pageTitle: 'mock enquiry detail in Welsh',
							title: 'Cyngor i mock organisation'
						});
					});
				});
			});

			describe('and there are errors', () => {
				let mockReq;
				let mockRes;
				let mockNext;

				beforeEach(() => {
					mockReq = {
						get: jest.fn(() => 's51advice/mock-referer-value'),
						params: {
							case_ref: 'mock-case-ref',
							id: 'mock-advice-detail-id'
						},
						path: '/projects/mock-case-ref/s51advice/mock-advice-detail-id',
						session: {}
					};
					mockRes = {
						render: jest.fn(),
						status: jest.fn(() => mockRes)
					};
					mockNext = jest.fn();
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
});
