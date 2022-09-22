const httpMocks = require('node-mocks-http');

const { createSubmission } = require('../../../src/controllers/submission');

describe('submission controller', () => {
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
			name: 'Joe Bloggs'
		}
	};

	it('should return a response with mocked details', async () => {
		const res = httpMocks.createResponse();

		await createSubmission(req, res);

		const response = res._getData();

		expect(response['name']).toEqual('Joe Bloggs');
		expect(response['file']['name']).toEqual('Test-EN010120.pdf');
	});
});
