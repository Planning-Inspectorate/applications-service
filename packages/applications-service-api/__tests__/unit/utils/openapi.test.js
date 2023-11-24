const { loadOpenAPISpec, createRequestValidator } = require('../../../src/utils/openapi');
const OpenAPIRequestValidator = require('openapi-request-validator').default;

describe('openapi utils', () => {
	describe('loadOpenAPISpec', () => {
		it('returned openapi spec as json', () => {
			const result = loadOpenAPISpec();

			expect(result['openapi']).toMatch(/\d\.\d\.\d/);
		});
	});

	describe('createRequestValidator', () => {
		describe('when route exists in openapi spec', () => {
			it.each([
				['POST', '/api/v1/interested-party'],
				['POST', '/api/v1/interested-party/'],
				['GET', '/api/v1/applications/:caseReference'],
				['GET', '/api/v1/applications/{caseReference}'],
				['GET', '/api/v1/applications/:caseReference/'],
				['GET', '/api/v1/applications/{caseReference}/']
			])('should return validator object for route path - %s %s', (verb, path) => {
				expect(createRequestValidator(verb, path)).toBeInstanceOf(OpenAPIRequestValidator);
			});
		});

		describe('when route does not exist in openapi spec', () => {
			it('should return an error', () => {
				expect(() =>
					createRequestValidator('POST', '/api/v1/interested-party/NOT-A-VALID-ROUTE')
				).toThrowError();
			});
		});
	});

	describe('validateRequest', () => {
		const validator = createRequestValidator('POST', '/api/v1/submissions/{caseReference}');
		const requestData = {
			headers: {
				'content-type':
					'multipart/form-data; boundary=--------------------------002628336047044988377296',
				'content-length': '1010'
			},
			params: {
				caseReference: 'EN010009'
			},
			query: {}
		};

		it('returns no errors given a request body conforming to the associated schema', () => {
			const validationErrors = validator.validateRequest({
				...requestData,
				body: {
					name: 'x',
					email: 'x@example.org',
					interestedParty: true,
					ipReference: '1234567879',
					deadline: 'Deadline 2',
					submissionType: 'Comments on LIRs',
					sensitiveData: false,
					lateSubmission: false
				}
			});

			expect(validationErrors).toBeUndefined();
		});

		it('returns error when required field is missing', () => {
			const validationErrors = validator.validateRequest({
				...requestData,
				body: {
					// name: 'x',
					email: 'x@example.org',
					interestedParty: true,
					ipReference: '1234567879',
					deadline: 'Deadline 2',
					submissionType: 'Comments on LIRs',
					sensitiveData: false,
					lateSubmission: false
				}
			});

			expect(validationErrors.errors[0].errorCode).toMatch('required');
			expect(validationErrors.errors[0].path).toMatch('name');
		});
	});
});
