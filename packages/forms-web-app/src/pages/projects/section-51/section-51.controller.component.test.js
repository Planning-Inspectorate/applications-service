const { getSection51 } = require('./section-51.controller');
const { listAdvice } = require('../../../services/advice.service');
const { getPaginationUrl, getPagination } = require('../utils/pagination/pagination');
const { documentsPerPage } = require('../utils/pagination/documentsPerPage');
const { adviceList } = require('./__mocks__/fixtures');

jest.mock('../../../services/advice.service', () => ({
	listAdvice: jest.fn()
}));
jest.mock('../utils/pagination/documentsPerPage', () => ({
	documentsPerPage: jest.fn()
}));
jest.mock('../utils/pagination/pagination', () => ({
	getPaginationUrl: jest.fn(),
	getPagination: jest.fn()
}));
describe('#getSection51', () => {
	describe('When getting the section 51 advice', () => {
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
				queryUrl: 'mock query url'
			});
			getPagination.mockReturnValue({ pagination: 'mock pagination' });
			documentsPerPage.mockReturnValue('mock results per page');
			listAdvice.mockReturnValue({
				advice: adviceList,
				pagination: 'mock pagination'
			});
			await getSection51(req, res, next);
		});
		it('should call the list advice service', () => {
			expect(listAdvice).toHaveBeenCalledWith('mock case ref', 'mock search term', {
				itemsPerPage: 'mock items per page',
				page: 'mock page'
			});
		});
		it('should render the section 51 page', () => {
			expect(res.render).toHaveBeenCalledWith('projects/section-51/index.njk', {
				title: 'Section 51 Advice',
				pagination: 'mock pagination',
				paginationUrl: 'mock pagination url',
				resultsPerPage: 'mock results per page',
				queryUrl: 'mock query url',
				searchTerm: 'mock search term',
				advice: [
					{
						adviceID: 'mock advice id 1',
						date: {
							date: '2023-01-01',
							text: 'Date advice given:'
						},
						link: 'View advice to mock organisation',
						method: 'mock enquiry method'
					},
					{
						adviceID: 'mock advice id 2',
						date: {
							date: 'mock date given 2',
							text: 'Date of meeting:'
						},
						link: 'View meeting with mock organisation',
						method: 'Meeting'
					},
					{
						adviceID: 'mock advice id 3',
						date: {
							date: 'mock date given 3',
							text: 'Date advice given:'
						},
						link: 'View advice to mock first name mock last name',
						method: 'Email'
					},
					{
						adviceID: 'mock advice id 4',
						date: {
							date: 'mock date given 4',
							text: 'Date advice given:'
						},
						link: 'View advice to Anonymous',
						method: 'Email'
					}
				]
			});
		});
	});
	describe('and there is an error', () => {
		const req = {
			query: {},
			params: {}
		};
		const res = { render: jest.fn(), status: jest.fn(() => res) };
		const next = jest.fn();
		beforeEach(async () => {
			listAdvice.mockResolvedValue(() => {
				throw new Error('something went wrong');
			});
			await getSection51(req, res, next);
		});
		it('should render the error page', () => {
			expect(next).toHaveBeenCalledWith(
				new TypeError("Cannot read properties of undefined (reading 'caseRef')")
			);
		});
	});
});
