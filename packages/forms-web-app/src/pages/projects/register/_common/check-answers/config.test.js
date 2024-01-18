const { registerCheckAnswersRoute } = require('./config');

describe('pages/projects/register/_common/check-answers/config', () => {
	describe('#registerCheckAnswersRoute', () => {
		it('should return the register check answers route', () => {
			expect(registerCheckAnswersRoute).toEqual('check-answers');
		});
	});
});
