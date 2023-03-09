const { adviceDocuments } = require('./advice.service');
const { searchAdviceDocuments } = require('../lib/application-api-wrapper');
jest.mock('../lib/application-api-wrapper', () => ({
	searchAdviceDocuments: jest.fn()
}));
describe('#adviceDocuments', () => {
	describe('When getting the advice documents', () => {
		let result;
		beforeEach(async () => {
			searchAdviceDocuments.mockReturnValue('mock advice documents');
			result = await adviceDocuments({ message: 'params' });
		});
		it('should call the wrapped searchAdviceDocuments', () => {
			expect(searchAdviceDocuments).toHaveBeenCalledWith({ message: 'params' });
		});
		it('should return the advice documents', () => {
			expect(result).toEqual('mock advice documents');
		});
	});
});
