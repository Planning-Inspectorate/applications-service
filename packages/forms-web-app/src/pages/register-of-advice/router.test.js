const {
	getSection51AdviceDetailController
} = require('../projects/section-51/advice-detail/controller');
const { getRegisterOfAdviceController } = require('./index/controller');

describe('pages/register-of-advice/router', () => {
	describe('#section51Router', () => {
		const get = jest.fn();
		const post = jest.fn();
		const use = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post,
				use
			})
		}));

		beforeEach(() => {
			require('./router');
		});

		it('should call the register of advice routes and controllers', () => {
			expect(get).toHaveBeenCalledWith('/register-of-advice', getRegisterOfAdviceController);

			expect(get).toHaveBeenCalledWith(
				'/register-of-advice/:id',
				getSection51AdviceDetailController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(0);
			expect(use).toBeCalledTimes(0);
		});
	});
});
