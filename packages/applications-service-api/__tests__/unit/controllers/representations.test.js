/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getRepresentationsForApplication: getRepresentations,
	getRepresentationById: getRepresentation
} = require('../../../src/controllers/representations');
const {
	getRepresentationsForApplication,
	getRepresentationByIdAndCaseRef
} = require('../../../src/services/representation.service');
const { getDocumentsByDataId } = require('../../../src/repositories/document.ni.repository');

const mockData = {
	totalItems: 1,
	representations: [
		{
			ID: 2,
			ProjectName: 'SPT Feb 2020',
			CaseReference: 'EN010009',
			DataID: null,
			UniqueReference: 'WS010006-34601',
			WebReference: null,
			PersonalName: 'Test (Test)',
			Representative: null,
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Members of the Public/Businesses',
			InterestInLand: null,
			SpecifyOther: null,
			CompulsoryAcquisitionHearing: null,
			RepresentationOriginal: null,
			RepresentationRedacted: 'Some comments',
			RelevantOrNot: null,
			SubmitFurtherWrittenReps: null,
			PreliminaryMeeting: null,
			OpenFloorHearings: null,
			IssuesSpecificHearings: null,
			DateRrepReceived: '2020-02-19T00:00:00.000Z',
			DoNotPublish: null,
			Attachments: 'WS010006-000002'
		}
	],
	currentPage: 1,
	itemsPerPage: 3,
	totalPages: 1,
	filters: { typeFilters: [] }
};

const returnData = {
	representations: [
		{
			ID: 2,
			ProjectName: 'SPT Feb 2020',
			CaseReference: 'EN010009',
			DataID: null,
			UniqueReference: 'WS010006-34601',
			WebReference: null,
			PersonalName: 'Test (Test)',
			Representative: null,
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Members of the Public/Businesses',
			InterestInLand: null,
			SpecifyOther: null,
			CompulsoryAcquisitionHearing: null,
			RepresentationOriginal: null,
			RepresentationRedacted: 'Some comments',
			RelevantOrNot: null,
			SubmitFurtherWrittenReps: null,
			PreliminaryMeeting: null,
			OpenFloorHearings: null,
			IssuesSpecificHearings: null,
			DateRrepReceived: '2020-02-19T00:00:00.000Z',
			DoNotPublish: null,
			Attachments: 'WS010006-000002'
		}
	],
	totalItems: 1,
	itemsPerPage: 3,
	totalPages: 1,
	currentPage: 1,
	filters: { typeFilters: [] }
};

jest.mock('../../../src/lib/config.js', () => ({
	...jest.requireActual('../../../src/lib/config.js'),
	logger: {
		level: process.env.LOGGER_LEVEL || 'info'
	}
}));

jest.mock('../../../src/services/representation.service');
jest.mock('../../../src/repositories/document.ni.repository');

getRepresentationsForApplication.mockImplementation(({ caseReference }) => {
	if (caseReference === 'EN010009') {
		return Promise.resolve(mockData);
	}
	if (caseReference === 'EN000000') {
		return Promise.resolve({
			count: 0,
			representations: [],
			currentPage: 1,
			itemsPerPage: 3,
			totalPages: 1,
			totalItems: 0,
			filters: { typeFilters: [] }
		});
	}
	return Promise.resolve(null);
});

getDocumentsByDataId.mockImplementation(() => {
	return Promise.resolve({ 0: {} });
});

describe('representation controller', () => {
	describe('getRepresentationsForApplication', () => {
		it('should get representations for application from mock', async () => {
			const req = httpMocks.createRequest({
				query: {
					caseReference: 'EN010009',
					page: 1,
					type: 'abc'
				}
			});
			const res = httpMocks.createResponse();
			await getRepresentations(req, res);
			const data = res._getData();
			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(data).toEqual(returnData);
		});
		it('should return an empty list if no representations found', async () => {
			const req = httpMocks.createRequest({
				query: {
					caseReference: 'EN000000'
				}
			});
			const res = httpMocks.createResponse();
			await getRepresentations(req, res);
			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				representations: [],
				totalItems: 0,
				itemsPerPage: 3,
				totalPages: 1,
				currentPage: 1,
				filters: {
					typeFilters: []
				}
			});
		});
	});
	describe('getRepresentationById', () => {
		it('should get representation from mock', async () => {
			getRepresentationByIdAndCaseRef.mockResolvedValue(mockData.representations[0]);
			const req = httpMocks.createRequest({
				params: {
					id: 2
				},
				query: {
					caseReference: 'EN010009'
				}
			});

			const res = httpMocks.createResponse();
			await getRepresentation(req, res);
			const data = res._getData();
			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(data).toEqual({ ...returnData.representations[0] });
		});
	});
});
