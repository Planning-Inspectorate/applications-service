describe('pages/projects/register/agent/router', () => {
	describe('#registerAgentRouter', () => {
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

		it('should call the register agent routes and controllers', () => {
			expect(get).toBeCalledTimes(0);
			expect(post).toBeCalledTimes(0);
			expect(use).toBeCalledTimes(0);
		});
	});
});
