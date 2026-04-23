const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getTimetables } = require('../../../src/controllers/timetables');
const { TIMETABLES_BACKOFFICE_RESPONSE } = require('../../__data__/timetables');

const { getTimetables: getTimetablesService } = require('../../../src/services/timetable.service');
jest.mock('../../../src/services/timetable.service');

describe('getTimetables', () => {
	const req = {
		params: {
			caseRef: 'EN010120'
		}
	};

	it('should return response with data if service returns timetable data', async () => {
		const res = httpMocks.createResponse();

		getTimetablesService.mockResolvedValueOnce(TIMETABLES_BACKOFFICE_RESPONSE);

		await getTimetables(req, res);

		expect(res._getData()).toEqual({
			timetables: TIMETABLES_BACKOFFICE_RESPONSE,
			totalItems: 2,
			itemsPerPage: 100,
			totalPages: 1,
			currentPage: 1
		});
	});

	it('should return a 404 error if no timetable data found', async () => {
		const res = httpMocks.createResponse();

		getTimetablesService.mockResolvedValueOnce([]);

		await getTimetables(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
	});

	it('should return a 500 error if an unhandled error occurs', async () => {
		const res = httpMocks.createResponse();

		getTimetablesService.mockRejectedValueOnce(new Error('some error'));

		await getTimetables(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
	});
});
