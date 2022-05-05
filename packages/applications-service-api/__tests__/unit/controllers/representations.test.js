/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getRepresentationsForApplication } = require('../../../src/controllers/representations');

const mockData = [
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
];

jest.mock('../../../src/models', () => {
  // eslint-disable-next-line global-require
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Representation = dbMock.define('Representation');

  Representation.$queryInterface.$useHandler((query, queryOptions) => {
    if (queryOptions[0].where.CaseReference === 'EN010009') {
      return mockData;
    }
    if (queryOptions[0].where.CaseReference === 'EN000000') {
      return [];
    }
    return null;
  });
  const db = {
    Representation,
  };
  return db;
});

describe('getRepresentationsForApplication', () => {
  it('should get representations for application from mock', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'EN010009',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentationsForApplication(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(mockData);
  });

  it('should return representations not found', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'EN000000',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentationsForApplication(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({
      code: StatusCodes.NOT_FOUND,
      errors: ['No representations found'],
    });
  });

  it('should return internal server error', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'ENF0000F',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentationsForApplication(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res._getData()).toContain(`Problem getting representations`);
  });
});
