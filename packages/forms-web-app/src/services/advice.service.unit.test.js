const { listAdvice } = require('./advice.service');
const { handler } = require('../lib/application-api-wrapper');
jest.mock('../lib/application-api-wrapper', () => ({
	handler: jest.fn()
}));
describe('#adviceDocuments', () => {
	describe('When getting the advice documents', () => {
		let result;
		beforeEach(async () => {
			handler.mockReturnValue({
				data: {
					advice: 'mock advice',
					totalItems: 20,
					itemsPerPage: 10,
					totalPages: 2,
					currentPage: 1
				}
			});
			result = await listAdvice('mock case ref', 'mock search term', { itemsPerPage: 10, page: 1 });
		});
		it('should call the wrapped searchAdviceDocuments', () => {
			expect(handler).toHaveBeenCalledWith(
				'searchAdviceDocuments',
				'/api/v1/advice?caseRef=mock+case+ref&searchTerm=mock+search+term&size=10&page=1',
				'GET',
				{}
			);
		});
		it('should return the advice documents', () => {
			expect(result).toEqual({
				advice: 'mock advice',
				pagination: { currentPage: 1, itemsPerPage: 10, totalItems: 20, totalPages: 2 }
			});
		});
	});
});
