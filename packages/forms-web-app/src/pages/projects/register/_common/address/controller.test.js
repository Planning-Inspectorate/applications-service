const { getRegisterAddressController, postRegisterAddressController } = require('./controller');

describe('pages/projects/register/_common/address/controller', () => {
	describe('#getRegisterAddressController', () => {
		describe('When getting the registration address page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/address',
					session: { mySelfRegdata: { ['address']: { text: 'mock address body' } } }
				};
				beforeEach(() => {
					getRegisterAddressController(req, res);
				});
				it('should render the registration address page with the myself data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/address/view.njk', {
						key: 'myself',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/address',
					session: { orgRegdata: { ['address']: { text: 'mock address body' } } }
				};
				beforeEach(() => {
					getRegisterAddressController(req, res);
				});
				it('should render the registration address page with the organisation data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/address/view.njk', {
						key: 'organisation',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/address',
					session: {
						behalfRegdata: { representor: { ['address']: { text: 'mock address body' } } }
					}
				};
				beforeEach(() => {
					getRegisterAddressController(req, res);
				});
				it('should render the registration address page with the agent data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/address/view.njk', {
						key: 'agent',
						address: {
							text: 'mock address body'
						}
					});
				});
			});
		});
		describe('and there is an error', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getRegisterAddressController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterAddressController', () => {
		describe('When posting the registration address', () => {
			let req;

			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};

			beforeEach(() => {
				req = {
					body: {
						line1: 'mock body address line 1',
						line2: 'mock body address line 2',
						line3: 'mock body address line 3',
						postcode: 'mock body address postcode',
						country: 'mock body address country'
					},
					params: {
						case_ref: 'mock-case-ref'
					}
				};
			});

			describe('and there is an unrecoverable error', () => {
				beforeEach(() => {
					req = {};
					postRegisterAddressController(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there is an error in the form', () => {
				beforeEach(() => {
					req = {
						...req,
						originalUrl: '/mock-base-url/mock-case-ref/register/myself/email',
						session: { mySelfRegdata: { address: 'mock session address' }, typeOfParty: 'myself' },
						body: {
							...req.body,
							errors: { address: 'an error' },
							errorSummary: [{ text: 'Error summary', href: '#' }]
						}
					};
					postRegisterAddressController(req, res);
				});

				it('should render address page with the error', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/address/view.njk', {
						address: {
							country: 'mock body address country',
							line1: 'mock body address line 1',
							line2: 'mock body address line 2',
							line3: 'mock body address line 3',
							postcode: 'mock body address postcode'
						},
						errorSummary: [{ href: '#', text: 'Error summary' }],
						errors: { address: 'an error' },
						key: 'myself'
					});
				});
			});

			describe('When the user is in edit mode', () => {
				beforeEach(() => {
					req = {
						...req,
						query: { mode: 'edit' }
					};
				});

				describe('and the user has previously selected agent and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/address',
							session: {
								behalfRegdata: {
									representor: { address: { line1: 'mock session address line 1' } }
								},
								typeOfParty: 'behalf'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: {
								representor: {
									address: {
										country: 'mock body address country',
										line1: 'mock body address line 1',
										line2: 'mock body address line 2',
										line3: 'mock body address line 3',
										postcode: 'mock body address postcode'
									}
								}
							},
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/check-answers'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,

							originalUrl: '/mock-base-url/mock-case-ref/register/myself/address',
							session: {
								mySelfRegdata: { address: { line1: 'mock session address line 1' } },
								typeOfParty: 'myself'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: {
								address: {
									country: 'mock body address country',
									line1: 'mock body address line 1',
									line2: 'mock body address line 2',
									line3: 'mock body address line 3',
									postcode: 'mock body address postcode'
								}
							},
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/address',
							session: {
								orgRegdata: { address: { line1: 'mock session address line 1' } },
								typeOfParty: 'organisation'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: {
								address: {
									country: 'mock body address country',
									line1: 'mock body address line 1',
									line2: 'mock body address line 2',
									line3: 'mock body address line 3',
									postcode: 'mock body address postcode'
								}
							},
							typeOfParty: 'organisation'
						});
					});

					it('should redirect to the register organisation check answers page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/check-answers'
						);
					});
				});
			});

			describe('When the user is NOT in edit mode', () => {
				describe('and the user has previously selected agent and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/agent/address',
							session: {
								behalfRegdata: { representor: {} },
								typeOfParty: 'behalf'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							behalfRegdata: {
								representor: {
									address: {
										country: 'mock body address country',
										line1: 'mock body address line 1',
										line2: 'mock body address line 2',
										line3: 'mock body address line 3',
										postcode: 'mock body address postcode'
									}
								}
							},
							typeOfParty: 'behalf'
						});
					});

					it('should redirect to the register agent number page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/agent/telephone-number'
						);
					});
				});

				describe('and the user has previously selected myself and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,

							originalUrl: '/mock-base-url/mock-case-ref/register/myself/address',
							session: {
								mySelfRegdata: {},
								typeOfParty: 'myself'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							mySelfRegdata: {
								address: {
									country: 'mock body address country',
									line1: 'mock body address line 1',
									line2: 'mock body address line 2',
									line3: 'mock body address line 3',
									postcode: 'mock body address postcode'
								}
							},
							typeOfParty: 'myself'
						});
					});

					it('should redirect to the register myself number page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/telephone-number'
						);
					});
				});

				describe('and the user has previously selected organisation and submitted an address', () => {
					beforeEach(() => {
						req = {
							...req,
							originalUrl: '/mock-base-url/mock-case-ref/register/organisation/address',
							session: {
								orgRegdata: {},
								typeOfParty: 'organisation'
							}
						};

						postRegisterAddressController(req, res);
					});

					it('should set the correct session data', () => {
						expect(req.session).toEqual({
							orgRegdata: {
								address: {
									country: 'mock body address country',
									line1: 'mock body address line 1',
									line2: 'mock body address line 2',
									line3: 'mock body address line 3',
									postcode: 'mock body address postcode'
								}
							},
							typeOfParty: 'organisation'
						});
					});

					it('should redirect to the register organisation number page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/telephone-number'
						);
					});
				});
			});
		});
	});
});
