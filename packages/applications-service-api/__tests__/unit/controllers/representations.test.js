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
  {
    ID: 21,
    ProjectName: 'Auto_Test',
    CaseReference: 'EN010009',
    DataID: null,
    UniqueReference: 'TR010109-34671',
    WebReference: null,
    PersonalName: 'Frosty Flights (Frosty Flights)',
    Representative: null,
    IndvdlOnBhalfName: null,
    OrgOnBhalfName: null,
    AgentOrgOnBhalfContactName: null,
    RepFrom: 'Parish Councils',
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
    DateRrepReceived: '2021-08-01T00:00:00.000Z',
    DoNotPublish: null,
    Attachments: 'TR010109-000002',
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
    const symbolKey = Reflect.ownKeys(queryOptions[0].where).find(
      (key) => key.toString() === 'Symbol(and)'
    );
    if (queryOptions[0].where[symbolKey][0].CaseReference === 'EN010009') {
      return [mockData[1]];
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

  it('should get documents from mock by search criteria', async () => {
    const req = httpMocks.createRequest({
      query: {
        applicationId: 'EN010009',
        searchTerm: 'Frosty',
      },
    });

    const res = httpMocks.createResponse();
    await getRepresentationsForApplication(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual([mockData[1]]);
  });
});
