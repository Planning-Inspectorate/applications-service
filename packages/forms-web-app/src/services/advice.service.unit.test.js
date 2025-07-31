const { listAdvice, getAdviceDetailData } = require('./advice.service');
const { handler } = require('../lib/application-api-wrapper');

jest.mock('../lib/application-api-wrapper', () => ({
	handler: jest.fn()
}));

describe('./advice.service', () => {
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
				result = await listAdvice('mock case ref', 'mock search term', {
					itemsPerPage: 10,
					page: 1
				});
			});
			it('should call the wrapped searchAdviceDocuments', () => {
				expect(handler).toHaveBeenCalledWith(
					'searchAdviceDocuments',
					'/api/v1/advice?caseReference=mock+case+ref&searchTerm=mock+search+term&size=10&page=1&sort=',
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
	describe('#getAdviceDetailData', () => {
		describe('When getting the advice detail data', () => {
			describe('and the advice detail data is found', () => {
				let result;
				beforeEach(async () => {
					handler.mockReturnValue({ data: { mock: 'handler value' } });
					result = await getAdviceDetailData('mock-advice-detail-id', 'mock-case-reference');
				});
				it('should call the wrapped getRawAdviceDetail', () => {
					expect(handler).toHaveBeenCalledWith(
						'getAdviceDetail',
						'/api/v1/advice/mock-advice-detail-id?caseReference=mock-case-reference',
						'GET'
					);
				});
				it('should return the advice detail data', () => {
					expect(result).toEqual({ mock: 'handler value' });
				});
			});
			describe('and the handler responds with a 404', () => {
				beforeEach(() => {
					handler.mockReturnValue({ resp_code: 404 });
				});
				it('should throw an error', () => {
					expect(getAdviceDetailData('mock-advice-detail-id')).rejects.toThrowError('NOT_FOUND');
				});
			});
		});
	});
});
