const { validateRequestWithOpenAPI } = require('../../../../src/middleware/validator/openapi');
const ApiError = require('../../../../src/error/apiError');
const { SUBMISSION_CREATE_REQUEST } = require('../../../__data__/submission');

describe('openapi validator', () => {
	describe('validateRequestWithOpenAPI', () => {
		const req = {
			...SUBMISSION_CREATE_REQUEST
		};
		const res = jest.fn();
		const next = jest.fn();

		it('given request with data not conforming to openapi spec, throws apierror with error messages', () => {
			const generateLongRepresentation = () => [...Array(65235)].map(() => 'a').join('');

			const requestWithTooLongCaseReference = {
				...req,
				params: {
					caseReference: '1234567890987654321'
				},
				body: {
					representation: generateLongRepresentation()
				}
			};

			const expectedError = new ApiError(400, {
				errors: [
					"'representation' must NOT have more than 65234 characters",
					"must have required property 'name'",
					"must have required property 'email'",
					"must have required property 'interestedParty'",
					"must have required property 'deadline'",
					"must have required property 'submissionType'",
					"'caseReference' must NOT have more than 10 characters",
					'\'caseReference\' must match pattern "^[A-Za-z]{2}\\d{6,8}$"'
				]
			});

			expect(() =>
				validateRequestWithOpenAPI(requestWithTooLongCaseReference, res, next)
			).toThrowError(expect.objectContaining(expectedError));
		});

		it('given request with data of wrong datatype, throws apierror with error messages', () => {
			const validProperties = {
				name: 'x',
				email: 'x@example.com',
				interestedParty: false,
				deadline: 'dl',
				submissionType: 'something'
			};

			const request = {
				...req,
				params: {
					caseReference: 'EN000001'
				},
				body: {
					...validProperties,
					sensitiveData: 'true', // should be boolean
					submissionId: '123' // should be integer
				}
			};

			const expectedError = new ApiError(400, {
				errors: ["'sensitiveData' must be boolean"]
			});

			expect(() => validateRequestWithOpenAPI(request, res, next)).toThrowError(
				expect.objectContaining(expectedError)
			);
		});

		describe('case reference pattern validation', () => {
			it.each(['EN000001', 'EN0000001', 'EN00000001', 'en000001', 'en0000001', 'en00000001'])(
				'returns no errors if case reference is in valid format',
				(caseReference) => {
					const request = {
						baseUrl: '/api/v1/applications',
						route: {
							path: '/:caseReference'
						},
						method: 'GET',
						params: {
							caseReference: caseReference
						}
					};
					expect(() => validateRequestWithOpenAPI(request, res, next)).not.toThrowError();
				}
			);

			it.each([
				'EN00001',
				'EN000000001',
				'en00001',
				'en000000001',
				'a',
				'aaaaaaaa',
				'11111111',
				'enn000001'
			])('returns error if case reference is in invalid format', (caseReference) => {
				const request = {
					baseUrl: '/api/v1/applications',
					route: {
						path: '/:caseReference'
					},
					method: 'GET',
					params: {
						caseReference: caseReference
					}
				};

				try {
					validateRequestWithOpenAPI(request, res, next);
				} catch (error) {
					const errors = error.message.errors;
					const lastError = errors[errors.length - 1];
					expect(lastError).toEqual('\'caseReference\' must match pattern "^[A-Za-z]{2}\\d{6,8}$"');
				}
			});
		});
	});
});
