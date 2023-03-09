const { getSection51 } = require('./section-51.controller');
const { searchAdviceDocuments } = require('../../../lib/application-api-wrapper');

jest.mock('../../../lib/application-api-wrapper', () => ({
	searchAdviceDocuments: jest.fn()
}));
describe('#getSection51', () => {
	describe('When getting the section 51 advice', () => {
		const req = {};
		const res = { render: jest.fn(), locals: { case_ref: 'mock case ref' } };
		beforeEach(async () => {
			searchAdviceDocuments.mockReturnValue({ data: { advice: 'mock advice documents' } });
			await getSection51(req, res);
		});
		it('should render the section 51 page', () => {
			expect(res.render).toHaveBeenCalledWith('projects/section-51/index.njk', {
				title: 'Section 51 Advice',
				advice: 'mock advice documents'
			});
		});
	});
});
