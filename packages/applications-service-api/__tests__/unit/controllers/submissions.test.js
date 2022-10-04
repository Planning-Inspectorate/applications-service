const httpMocks = require('node-mocks-http');

const { createSubmission } = require('../../../src/controllers/submissions');

describe('submissions controller', () => {
	const req = {
		params: {
			caseRef: 'EN010120'
		},
		file: {
			fieldname: 'file',
			originalname: 'Test.pdf',
			encoding: '7bit',
			mimetype: 'application/pdf',
			destination: '/opt/app/packages/applications-service-api/uploads',
			filename: 'ffca3ad6ef872224cf8ace2db5726bb3',
			path: '/opt/app/packages/applications-service-api/uploads/ffca3ad6ef872224cf8ace2db5726bb3',
			size: 6406
		},
		body: {
			name: 'Joe Bloggs',
			submissionId: '123'
		}
	};

	it('should return a success response with mocked details', async () => {
		const res = httpMocks.createResponse();

		await createSubmission(req, res);

		const response = res._getData();

		expect(res._getStatusCode()).toEqual(201);
		expect(response['name']).toEqual('Joe Bloggs');
	});

	it('should return reformated file name including submissionId and sequence number if file uploaded', async () => {
		const res = httpMocks.createResponse();

		await createSubmission(req, res);

		const response = res._getData();

		expect(res._getStatusCode()).toEqual(201);
		expect(response['file']['name']).toEqual('Test-123-1.pdf');
	});

	it('should return representation if comment submitted', async () => {
		const res = httpMocks.createResponse();

		await createSubmission(
			{
				params: {
					caseRef: 'EN010120'
				},
				body: {
					representation: 'My representation'
				}
			},
			res
		);

		const response = res._getData();

		expect(res._getStatusCode()).toEqual(201);
		expect(response['representation']).toEqual('My representation');
	});

	it('should return 400 error if neither representation nor file submitted', async () => {
		const res = httpMocks.createResponse();

		await createSubmission(
			{
				params: {
					caseRef: 'EN010120'
				},
				body: {
					name: 'Mr No File or Representation'
				}
			},
			res
		);

		expect(res._getStatusCode()).toEqual(400);
	});
});
