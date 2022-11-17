const {
	validateCreateSubmissionRequest
} = require('../../../../src/middleware/validator/submission');
const { REQUEST_FILE_DATA } = require('../../../__data__/file');
const {SUBMISSION_CREATE_REQUEST} = require("../../../__data__/submission");

jest.mock("../../../../src/middleware/validator/openapi");
const validateRequestWithOpenAPIMock = require("../../../../src/middleware/validator/openapi").validateRequestWithOpenAPI;

describe('submission request validator', () => {
	describe('validateCreateSubmissionRequest', () => {
		const res = jest.fn();
		const next = jest.fn();

		it('returns error if request does not contain required properties', async () => {
			const openAPIValidationError = {
				code: 400,
				message: {
					errors: [
						"must have required property 'name'",
						"must have required property 'email'",
						"must have required property 'interestedParty'",
						"must have required property 'deadline'",
						"must have required property 'submissionType'"
					]
				}
			};

			validateRequestWithOpenAPIMock.mockImplementationOnce(() => { throw openAPIValidationError });

			expect(() => validateCreateSubmissionRequest(SUBMISSION_CREATE_REQUEST, res, next)).toThrowError(
				expect.objectContaining(openAPIValidationError)
			);
		});

		it('returns error if request does not representation or file', async () => {
			expect(() =>
				validateCreateSubmissionRequest(
					{
						...SUBMISSION_CREATE_REQUEST,
						body: {
							name: 'x',
							email: 'x@example.com',
							interestedParty: false,
							deadline: 'dl',
							submissionType: 'something'
						}
					},
					res,
					next
				)
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ["must have required property 'representation' or 'file'"]
					}
				})
			);
		});

		it('returns error if request has both representation and file', async () => {
			expect(() =>
				validateCreateSubmissionRequest(
					{
						...SUBMISSION_CREATE_REQUEST,
						body: {
							name: 'x',
							email: 'x@example.com',
							interestedParty: false,
							deadline: 'dl',
							submissionType: 'something',
							representation: 'fdomsorjdi'
						},
						file: REQUEST_FILE_DATA
					},
					res,
					next
				)
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ["must have only one of property 'representation' or 'file'"]
					}
				})
			);
		});

		it('returns error if request contains file of unsupported type', async () => {
			expect(() =>
				validateCreateSubmissionRequest(
					{
						...SUBMISSION_CREATE_REQUEST,
						body: {
							name: 'x',
							email: 'x@example.com',
							interestedParty: false,
							deadline: 'dl',
							submissionType: 'something'
						},
						file: {
							...REQUEST_FILE_DATA,
							mimeType: 'audio/wav'
						}
					},
					res,
					next
				)
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ['file type must be one of pdf,doc,docx,jpg,jpeg,png,tif,tiff,xls,xlsx']
					}
				})
			);
		});
	});
});
