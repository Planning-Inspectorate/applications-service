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
					"'caseReference' must NOT have more than 12 characters",
					'\'caseReference\' must match pattern "^[A-Z]{2}\\d{6,8}$"'
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
				errors: ["'sensitiveData' must be boolean", "'submissionId' must be integer"]
			});

			expect(() => validateRequestWithOpenAPI(request, res, next)).toThrowError(
				expect.objectContaining(expectedError)
			);
		});
	});
});
