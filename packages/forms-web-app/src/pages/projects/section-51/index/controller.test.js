const { getSection51IndexController } = require('./controller');
const { listAdvice } = require('../../../../services/advice.service');
const { getPaginationUrl, getPagination } = require('../../_utils/pagination/pagination');
const { documentsPerPage } = require('../../_utils/pagination/documentsPerPage');
const { adviceList } = require('../__mocks__/fixtures');

jest.mock('../../../../services/advice.service', () => ({
	listAdvice: jest.fn()
}));
jest.mock('../../_utils/pagination/documentsPerPage', () => ({
	documentsPerPage: jest.fn()
}));
jest.mock('../../_utils/pagination/pagination', () => ({
	getPaginationUrl: jest.fn(),
	getPagination: jest.fn()
}));

describe('pages/projects/section-51/index/controller', () => {
	describe('#getSection51IndexController', () => {
		describe('When getting the section 51 advice', () => {
			describe('and there is an issue', () => {
				const req = {
					query: {
						searchTerm: '',
						page: '',
						itemsPerPage: ''
					}
				};
				const res = { render: jest.fn(), locals: { caseRef: 'mock case ref' } };
				const next = jest.fn();

				beforeEach(async () => {
					listAdvice.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					await getSection51IndexController(req, res, next);
				});
				it('should throw an error', () => {
					expect(next).toHaveBeenCalledWith(new Error('something went wrong'));
				});
			});

			describe('and there are no issues', () => {
				const req = {
					query: {
						searchTerm: 'mock search term',
						page: 'mock page',
						itemsPerPage: 'mock items per page'
					}
				};
				const res = { render: jest.fn(), locals: { caseRef: 'mock case ref' } };
				const next = jest.fn();
				beforeEach(async () => {
					getPaginationUrl.mockReturnValue({
						paginationUrl: 'mock pagination url',
						queryUrl: 'mock search url'
					});
					getPagination.mockReturnValue({ pagination: 'mock pagination' });
					documentsPerPage.mockReturnValue('mock results per page');
					listAdvice.mockReturnValue({
						advice: adviceList,
						pagination: 'mock pagination'
					});
					await getSection51IndexController(req, res, next);
				});
				it('should call the list advice service', () => {
					expect(listAdvice).toHaveBeenCalledWith('mock case ref', 'mock search term', {
						itemsPerPage: 'mock items per page',
						page: 'mock page'
					});
				});
				it('should render the section 51 page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/section-51/index/view.njk', {
						pagination: 'mock pagination',
						paginationUrl: 'mock pagination url',
						resultsPerPage: 'mock results per page',
						searchTerm: 'mock search term',
						adviceExists: true,
						searchAttempted: true,
						adviceViewModel: [
							{
								enquiryDetail: 'mock enquiry detail',
								adviceGivenBy: 'mock organisation',
								adviceTypeLabel: 'Enquiry from',
								date: {
									date: '2023-01-01',
									text: 'Date advice given:'
								},
								link: '/projects/mock case ref/s51advice/mock advice id 1',
								linkTitle: 'View advice to mock organisation'
							},
							{
								enquiryDetail: 'mock enquiry detail 2',
								adviceGivenBy: 'mock organisation',
								adviceTypeLabel: 'Meeting with',
								date: {
									date: 'mock date given 2',
									text: 'Date of meeting:'
								},
								link: '/projects/mock case ref/s51advice/mock advice id 2',
								linkTitle: 'View meeting with mock organisation'
							},
							{
								enquiryDetail: 'mock enquiry detail 3',
								adviceGivenBy: 'mock first name mock last name',
								adviceTypeLabel: 'Enquiry from',
								date: {
									date: 'mock date given 3',
									text: 'Date advice given:'
								},
								link: '/projects/mock case ref/s51advice/mock advice id 3',
								linkTitle: 'View advice to mock first name mock last name'
							},
							{
								enquiryDetail: 'mock enquiry detail 4',
								adviceGivenBy: 'Anonymous',
								adviceTypeLabel: 'Enquiry from',
								date: {
									date: 'mock date given 4',
									text: 'Date advice given:'
								},
								link: '/projects/mock case ref/s51advice/mock advice id 4',
								linkTitle: 'View advice to Anonymous'
							}
						]
					});
				});
			});
		});
	});
});
