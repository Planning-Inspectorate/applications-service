const { getSection51 } = require('./section-51.controller');
describe('#getSection51', () => {
	describe('When getting the section 51 advice', () => {
		const req = {};
		const res = { render: jest.fn() };
		beforeEach(() => {
			getSection51(req, res);
		});
		it('should render the section 51 page', () => {
			expect(res.render).toHaveBeenCalledWith('section-51/index.njk');
		});
	});
});
