const { getSection51 } = require('./section-51.controller');
describe('#getSection51', () => {
	describe('When getting the section 51 advice', () => {
		const req = { params: { case_ref: 'mock case ref' } };
		const res = { render: jest.fn() };
		beforeEach(() => {
			getSection51(req, res);
		});
		it('should render the section 51 page', () => {
			expect(res.render).toHaveBeenCalledWith('projects/section-51/index.njk', {
				title: 'Section 51 Advice'
			});
		});
	});
});
