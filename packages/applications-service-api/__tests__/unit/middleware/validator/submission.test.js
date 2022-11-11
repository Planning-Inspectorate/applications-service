const { validateRequest } = require('../../../../src/middleware/validator/submission');
const { REQUEST_FILE_DATA } = require('../../../__data__/file');

describe('submission request validator', () => {
	describe('validateRequest', () => {
		const request = {
			headers: {
				'content-type':
					'multipart/form-data; boundary=--------------------------002628336047044988377296',
				'content-length': '1010'
			},
			body: {},
			params: {
				caseReference: 'EN010009'
			},
			query: {}
		};

		it('returns error if request does not contain required properties', () => {
			expect(() => validateRequest(request)).toThrowError(
				expect.objectContaining({
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
				})
			);
		});

		it('returns error if request does not representation or file', () => {
			expect(() =>
				validateRequest({
					...request,
					body: {
						name: 'x',
						email: 'x@example.com',
						interestedParty: false,
						deadline: 'dl',
						submissionType: 'something'
					}
				})
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ["must have required property 'representation' or 'file'"]
					}
				})
			);
		});

		it('returns error if request has both representation and file', () => {
			expect(() =>
				validateRequest({
					...request,
					body: {
						name: 'x',
						email: 'x@example.com',
						interestedParty: false,
						deadline: 'dl',
						submissionType: 'something',
						representation: 'fdomsorjdi'
					},
					file: REQUEST_FILE_DATA
				})
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ["must have only one of property 'representation' or 'file'"]
					}
				})
			);
		});

		it('returns error if request contains file of unsupported type', () => {
			expect(() =>
				validateRequest({
					...request,
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
				})
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ['file type must be one of pdf,doc,docx,jpg,jpeg,png,tif,tiff,xls,xlsx']
					}
				})
			);
		});

		it('returns error if request contains representation larger than max limit', () => {
			const generateLongRepresentation = () => [...Array(65235)].map(() => 'a').join('');
			expect(() =>
				validateRequest({
					...request,
					body: {
						name: 'x',
						email: 'x@example.com',
						interestedParty: false,
						deadline: 'dl',
						submissionType: 'something',
						representation: generateLongRepresentation()
					}
				})
			).toThrowError(
				expect.objectContaining({
					code: 400,
					message: {
						errors: ["'representation' must not have more than 65234 characters"]
					}
				})
			);
		});
	});
});
