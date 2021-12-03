/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
  getInterestedParty,
  createInterestedParty,
  updateComments,
} = require('../../../src/controllers/interested-party');

const ipDataOwnBehalf = {
  ID: 30000120,
  caseref: 'EN010009',
  behalf: 'me',
  mename: 'David White',
  mebuild: 'Temple Quay',
  mestreet: '',
  metown: 'BRISTOL',
  mecounty: '',
  mecode: 'BS1 6PN',
  mecountry: 'United Kingdom',
  memail: 'david.white@planninginspectorate.gov.uk',
  mephone: '0303 111 111',
  orgname: '',
  contactName: '',
  contactJob: '',
  orgbuild: '',
  orgstreet: '',
  orgtown: '',
  orgcounty: '',
  orgcode: '',
  orgcountry: '',
  orgmail: '',
  orgphone: '',
  youname: '',
  youbuild: '',
  youstreet: '',
  youtown: '',
  youcounty: '',
  youcode: '',
  youcountry: '',
  youmail: '',
  youphone: '',
  agname: '',
  agorgname: '',
  agbuild: '',
  agstreet: '',
  agtown: '',
  agcounty: '',
  agcode: '',
  agcountry: '',
  agmail: '',
  agphone: '',
  therep: '{"comments":[{"type":"Noise","comment":"I dont like noise either"}]}',
  validated: '2021-06-22T14:45:46.000Z',
  emailed: '2021-06-22T14:45:46.000Z',
  exported: null,
  web_ref: 1,
};

const createIpOnOwnBehalf = {
  case_ref: 'EN010009',
  behalf: 'me',
  'full-name': 'Humpty Dumpty',
  'over-18': 'yes',
  address: {
    line1: 'Queens Building',
    line2: 'Queens Wall Street',
    line3: 'London',
    postcode: 'HE127TY',
    country: 'UK',
  },
  email: 'test@test.com',
  telephone: '0132232432',
};

const createIpOnOrgBehalf = {
  case_ref: 'EN010009',
  behalf: 'them',
  'full-name': 'Mr Bean',
  'over-18': 'yes',
  'organisation-name': 'Ministry of Coffee and Social Affairs',
  role: 'Coffee connoisseur',
  address: {
    line1: 'Coffee Building',
    line2: 'Coffee Wall Street',
    line3: 'London',
    postcode: 'CO127FE',
    country: 'UK',
  },
  email: 'test@test.com',
  telephone: '0132232432',
};

jest.mock('../../../src/models', () => {
  // eslint-disable-next-line global-require
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const InterestedParty = dbMock.define('InterestedParty');

  // eslint-disable-next-line consistent-return
  InterestedParty.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findOne') {
      if (queryOptions[0].where.caseRef === 'EN010009') {
        return InterestedParty.build({ ...ipDataOwnBehalf });
      }
      return null;
    }
    if (query === 'create') {
      return InterestedParty.build({ ...createIpOnOwnBehalf });
    }
    if (query === 'update') {
      if (queryOptions[1].where.ID === 30000120) {
        return InterestedParty.build({ ...ipDataOwnBehalf });
      }
      return null;
    }
  });
  const db = {
    InterestedParty,
  };
  return db;
});

describe('getInterestedParty', () => {
  it('should get interested party from mock', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'EN010009',
      },
    });

    const res = httpMocks.createResponse();
    await getInterestedParty(req, res);
    const data = res._getData();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(ipDataOwnBehalf);
  });

  it('should return interested party not found', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'EN000000',
      },
    });

    const res = httpMocks.createResponse();
    await getInterestedParty(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({
      code: 404,
      errors: ['Interested party for project EN000000 not found'],
    });
  });
});

describe('insertInterestedParty', () => {
  it('should create an interested party on own behalf', async () => {
    const req = httpMocks.createRequest({
      body: {
        ...createIpOnOwnBehalf,
      },
    });
    const res = httpMocks.createResponse();
    await createInterestedParty(req, res);

    expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
  });

  it('should create an interested party on organisation behalf', async () => {
    const req = httpMocks.createRequest({
      body: {
        ...createIpOnOrgBehalf,
      },
    });
    const res = httpMocks.createResponse();
    await createInterestedParty(req, res);

    expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
  });
});

describe('updateComments', () => {
  it('should update comments for party', async () => {
    const req = httpMocks.createRequest({
      params: {
        ID: 30000120,
      },
      body: {
        comments: [
          {
            type: 'Traffic',
            comment: "I don't like traffic",
          },
        ],
      },
    });

    const res = httpMocks.createResponse();
    await updateComments(req, res);

    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
  });
});
