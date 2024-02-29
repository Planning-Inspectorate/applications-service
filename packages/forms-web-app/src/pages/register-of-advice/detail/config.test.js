const { registerOfAdviceDetailRouteParam, registerOfAdviceDetailView } = require('./config');

describe('pages/register-of-advice/detail/config', () => {
	describe('#registerOfAdviceDetailRouteParam', () => {
		it('should return the register of advice detail route parameter', () => {
			expect(registerOfAdviceDetailRouteParam).toEqual('id');
		});
	});

	describe('#registerOfAdviceDetailView', () => {
		it('should return the register of advice detail view', () => {
			expect(registerOfAdviceDetailView).toEqual('register-of-advice/detail/view.njk');
		});
	});
});
