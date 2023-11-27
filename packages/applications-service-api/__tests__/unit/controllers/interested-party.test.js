const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { createInterestedParty } = require('../../../src/controllers/interested-party');

jest.mock('../../../src/services/interestedParty.service');
const {
	createInterestedParty: createInterestedPartyService
} = require('../../../src/services/interestedParty.service');

describe('interested-party controller', () => {
	const requestBody = {
		case_ref: 'EN010116',
		behalf: 'me',
		'full-name': 'Joe Bloggs',
		'over-18': 'yes',
		address: {
			line1: '123 Some Street',
			line2: 'Kings Cross',
			line3: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		},
		email: 'joe@example.org',
		telephone: '07700900000',
		comment: 'this is my representation'
	};

	it('should return 201 response with reference ID', async () => {
		const req = httpMocks.createRequest({
			body: requestBody
		});
		const res = httpMocks.createResponse();

		createInterestedPartyService.mockResolvedValueOnce({ referenceId: 'some-ref-id' });

		await createInterestedParty(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
		expect(res._getData()).toEqual({ referenceId: 'some-ref-id' });
	});
});
