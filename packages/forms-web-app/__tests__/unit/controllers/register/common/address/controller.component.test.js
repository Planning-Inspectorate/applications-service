const {
	getAddress,
	postAddress
} = require('../../../../../../src/controllers/register/common/address/controller');

describe('controllers/register/common/address/controller', () => {
	describe('#getAddress', () => {
		describe('When getting the registration address page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/address',
					session: { mySelfRegdata: { ['address']: { text: 'mock address body' } } }
				};
				beforeEach(() => {
					getAddress(req, res);
				});
				it('should render the registration address page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/address', {
						titleTag:
							'What is your address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/address',
					session: { orgRegdata: { ['address']: { text: 'mock address body' } } }
				};
				beforeEach(() => {
					getAddress(req, res);
				});
				it('should render the registration address page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/address', {
						titleTag:
							'What is your address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/address',
					session: {
						behalfRegdata: { representor: { ['address']: { text: 'mock address body' } } }
					}
				};
				beforeEach(() => {
					getAddress(req, res);
				});
				it('should render the registration address page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/address', {
						titleTag:
							'What is your address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
		});
	});
	describe('#postAddress', () => {
		describe('When posting the registration address', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};

			const mockAddress = {
				line1: 'mock line 1',
				line2: 'mock line 2',
				line3: 'mock line 3',
				postcode: 'mock postcode',
				country: 'mock country'
			};
			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postAddress(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the form', () => {
				const req = {
					originalUrl: '/register/myself/address',
					session: { mySelfRegdata: { ['address']: 'mock address' } },
					body: {
						errors: { ['address']: 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }],
						...mockAddress
					}
				};
				beforeEach(() => {
					postAddress(req, res);
				});

				it('should render address page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/address', {
						address: mockAddress,
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							address: 'an error'
						},
						titleTag:
							'What is your address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has submitted a address for selected myself', () => {
				const req = {
					originalUrl: '/register/myself/address',
					session: { mySelfRegdata: { ['address']: { text: 'mock address' } } },
					body: {
						address: { ...mockAddress }
					},
					query: {}
				};
				beforeEach(() => {
					postAddress(req, res);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/myself/telephone-number');
				});
			});
			describe('and the user has submitted a address for selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/address',
					session: { orgRegdata: { ['address']: { text: 'mock address' } } },
					body: {
						address: { ...mockAddress }
					},
					query: {}
				};
				beforeEach(() => {
					postAddress(req, res);
				});
				it('should redirect to the next page for organisation', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/organisation/telephone-number');
				});
			});
			describe('and the user has submitted a address for selected agent', () => {
				const req = {
					originalUrl: '/register/agent/address',
					session: {
						behalfRegdata: { representor: { ['address']: { text: 'mock address body' } } }
					},
					body: {
						address: { ...mockAddress }
					},
					query: {}
				};
				beforeEach(() => {
					postAddress(req, res);
				});
				it('should redirect to the next page for agent', () => {
					expect(res.redirect).toHaveBeenCalledWith('/register/agent/who-representing');
				});
			});
		});
	});
});
