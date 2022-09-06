const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../../../src/controllers/examination/your-interested-party-number');

const {
	routesConfig: {
		examination: {
			pages: {
				yourInterestedPartyNumber: {
					view: yourInterestedPartyNumberView,
					route: yourInterestedPartyNumberRoute
				},
				haveAnInterestedPartyNumber: { route: haveAnInterestedPartyNumberRoute },
				submittingFor: { route: submittingForRoute }
			}
		}
	},
	routesConfig: { examination }
} = require('../../../../src/routes/config');

const interestedPartyNumberString = 'interested-party-number';

const responseObject = {
	backLinkUrl: `${examination.directory + haveAnInterestedPartyNumberRoute}`,
	pageTitle: "What's your interested party number?",
	title: "What's your interested party number?"
};

const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/examination/your-interested-party-number', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					name: 'Drax',
					caseRef: '123'
				}
			}
		};

		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getYourInterestedPartyNumber', () => {
		it('should call the correct template', () => {
			responseObject.interestedPartyNumber = '';

			getYourInterestedPartyNumber(req, res);
			expect(res.render).toHaveBeenCalledWith(yourInterestedPartyNumberView, responseObject);

			delete responseObject.interestedPartyNumber;
		});
	});

	describe('postYourInterestedPartyNumber', () => {
		it(`'should post data and redirect to ${
			examination.directory + submittingForRoute
		} if name is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					interestedPartyNumber: interestedPartyNumberString
				},
				query: {
					mode: ''
				}
			};
			await postYourInterestedPartyNumber(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`${examination.directory + submittingForRoute}`);
		});

		it(`'should post data and redirect to ${
			examination.directory + yourInterestedPartyNumberRoute
		} if query mode is edit`, async () => {
			const mockRequest = {
				...req,
				body: {
					interestedPartyNumber: interestedPartyNumberString
				},
				query: {
					mode: 'edit'
				}
			};
			await postYourInterestedPartyNumber(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`${examination.directory + yourInterestedPartyNumberRoute}`
			);
		});

		it(`'should post data and redirect to ${
			examination.directory + submittingForRoute
		} if query mode is not edit`, async () => {
			const mockRequest = {
				...req,
				body: {
					interestedPartyNumber: interestedPartyNumberString
				},
				query: {
					mode: 'test'
				}
			};
			await postYourInterestedPartyNumber(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`${examination.directory + submittingForRoute}`);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await postYourInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(yourInterestedPartyNumberView, {
				...{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				},
				...responseObject
			});
		});

		it(`should re-render the template with errors if input text is empty`, async () => {
			const emptyStringValue = '';

			const mockRequest = {
				body: {
					errors: {
						interestedPartyNumberString: {
							value: emptyStringValue,
							msg: 'Enter your interested party number',
							param: interestedPartyNumberString,
							location: 'body'
						}
					}
				},
				query: {
					mode: ''
				}
			};

			const expectedResult = JSON.parse(
				JSON.stringify({
					...responseObject,
					...{
						errorSummary: [],
						errors: {
							interestedPartyNumberString: {
								value: emptyStringValue,
								msg: 'Enter your interested party number',
								param: interestedPartyNumberString,
								location: 'body'
							}
						}
					}
				})
			);

			await postYourInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(yourInterestedPartyNumberView, expectedResult);
		});

		const lessThan3Characters = 'ab';
		const moreThan20Characters = 'abcdefghjklmnopqrstuv';

		[lessThan3Characters, moreThan20Characters].forEach((fullNameValue, index) => {
			it(`should re-render the template with errors if input text is ${
				index === 0 ? 'less than 3' : 'greater than 64'
			} characters`, async () => {
				const mockRequest = {
					body: {
						errors: {
							interestedPartyNumberString: {
								value: fullNameValue,
								msg: 'Your interested party number must be between 3 and 20 characters',
								param: interestedPartyNumberString,
								location: 'body'
							}
						}
					},
					query: {
						mode: ''
					}
				};

				const expectedResult = JSON.parse(
					JSON.stringify({
						...responseObject,
						...{
							errorSummary: [],
							errors: {
								interestedPartyNumberString: {
									value: fullNameValue,
									msg: 'Your interested party number must be between 3 and 20 characters',
									param: interestedPartyNumberString,
									location: 'body'
								}
							}
						}
					})
				);

				await postYourInterestedPartyNumber(mockRequest, res);
				expect(res.redirect).not.toHaveBeenCalled();

				expect(res.render).toHaveBeenCalledWith(yourInterestedPartyNumberView, expectedResult);
			});
		});
	});
});
