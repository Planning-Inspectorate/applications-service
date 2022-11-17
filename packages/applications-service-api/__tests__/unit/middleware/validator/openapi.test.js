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
					"'representation' must not have more than 65234 characters",
					"must have required property 'name'",
					"must have required property 'email'",
					"must have required property 'interestedParty'",
					"must have required property 'deadline'",
					"must have required property 'submissionType'"
				]
			});

			expect(() =>
				validateRequestWithOpenAPI(requestWithTooLongCaseReference, res, next)
			).toThrowError(expect.objectContaining(expectedError));
		});
	});
});
