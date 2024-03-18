const { registeringForRoute, registeringForOptions } = require('./config');

describe('pages/projects/register/registering-for/config', () => {
	describe('#registeringForRoute', () => {
		it('should return the registering for route', () => {
			expect(registeringForRoute).toEqual('who-registering-for');
		});
	});

	describe('#registeringForOptions', () => {
		it('should return the registering for options', () => {
			expect(registeringForOptions).toEqual({
				agent: 'behalf',
				myself: 'myself',
				organisation: 'organisation'
			});
		});
	});
});
