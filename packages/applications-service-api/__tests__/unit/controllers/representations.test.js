/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
  getRepresentationsForApplication: getRepresentations,
} = require('../../../src/controllers/representations');
const {
  getFilters,
  getRepresentationsForApplication,
} = require('../../../src/services/representation.service');

const mockData = {
  count: 1,
  rows: [
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
      Attachments: 'WS010006-000002',
    },
  ],
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
      Attachments: 'WS010006-000002',
    },
  ],
  totalItems: 1,
  itemsPerPage: 3,
  totalPages: 1,
  currentPage: 1,
  filters: { typeFilters: [] },
};

jest.mock('../../../src/lib/config.js', () => ({
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
  },
  itemsPerPage: 3,
}));

jest.mock('../../../src/services/representation.service');

getFilters.mockImplementation(() => Promise.resolve([]));
getRepresentationsForApplication.mockImplementation((applicationId) => {
  if (applicationId === 'EN010009') {
    return Promise.resolve(mockData);
  }
  if (applicationId === 'EN000000') {
    return Promise.resolve({ rows: [] });
  }
  return Promise.resolve(null);
});

describe('getRepresentationsForApplication', () => {
  it('should get representations for application from mock', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'EN010009',
        page: 1,
      },
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
        applicationId: 'EN000000',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentationsForApplication(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(res._getData()).toEqual({
      representations: [],
      totalItems: 0,
      itemsPerPage: 3,
      totalPages: 1,
      currentPage: 1,
    });
  });

  it('should return internal server error', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'ENF0000F',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentations(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res._getData()).toContain(`Problem getting representations`);
  });
});
