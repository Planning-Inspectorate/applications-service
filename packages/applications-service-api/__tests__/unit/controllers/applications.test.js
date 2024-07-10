/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
} = require('../../../src/controllers/applications');
const {
	APPLICATION_FO,
	APPLICATION_API_V1,
	APPLICATION_API
} = require('../../__data__/application');

jest.mock('../../../src/services/application.service');
const getAllApplicationsDownloadService =
	require('../../../src/services/application.service').getAllApplicationsDownload;
const getAllApplicationsService =
	require('../../../src/services/application.service').getAllApplications;
const getApplicationService = require('../../../src/services/application.service').getApplication;
describe('getApplication', () => {
	it('should get application from mock', async () => {
		getApplicationService.mockResolvedValueOnce({
			...APPLICATION_API,
			sourceSystem: 'ODT'
		});

		const req = httpMocks.createRequest({
			params: {
				caseReference: 'EN010116'
			}
		});

		const res = httpMocks.createResponse();
		await getApplication(req, res);
		const data = res._getData();
		delete data.id;
		delete data.createdAt;
		delete data.updatedAt;

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(data).toEqual({
			...APPLICATION_API_V1,
			DateOfDCOAcceptance_NonAcceptance: null,
			sourceSystem: 'ODT'
		});
	});

	it('should throw application not found', async () => {
		getApplicationService.mockResolvedValueOnce(null);

		const req = httpMocks.createRequest({
			params: {
				caseReference: 'EN000000'
			}
		});
		const res = httpMocks.createResponse();

		await expect(getApplication(req, res)).rejects.toEqual({
			code: 404,
			message: {
				errors: ['Application EN000000 was not found']
			}
		});
	});
});

describe('getAllApplications', () => {
	it('should get all applications from mock', async () => {
		getAllApplicationsService.mockResolvedValue({
			applications: [APPLICATION_FO],
			totalItems: 1,
			currentPage: 1,
			itemsPerPage: 25,
			totalPages: 1
		});

		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();

		await getAllApplications(req, res);

		const { applications } = res._getData();
		const dataValue = applications[0];
		delete dataValue.id;
		delete dataValue.createdAt;
		delete dataValue.updatedAt;

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(applications.length).toBe(1);
		expect(dataValue).toEqual(APPLICATION_FO);
	});
});

describe('getAllApplicationsDownload', () => {
	it('should get all applications from mock', async () => {
		getAllApplicationsDownloadService.mockResolvedValue('csv-foo');

		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();

		await getAllApplicationsDownload(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual('csv-foo');
	});
});
