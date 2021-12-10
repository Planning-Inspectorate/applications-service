/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
  getInterestedParty,
  createInterestedParty,
  updateComments,
  confirmEmailAddress,
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

const ipDataOrgBehalf = {
  ID: 30000135,
  caseref: 'EN010009',
  behalf: 'them',
  mename: '',
  mebuild: '',
  mestreet: '',
  metown: '',
  mecounty: '',
  mecode: '',
  mecountry: '',
  memail: '',
  mephone: '',
  orgname: 'Ministry of Coffee and Social Affairs',
  contactName: 'Mr Bean',
  contactJob: 'Coffee connoisseur',
  orgbuild: 'Coffee Building',
  orgstreet: 'Coffee Wall Street',
  orgtown: 'London',
  orgcounty: 'over18',
  orgcode: 'CO127FE',
  orgcountry: 'UK',
  orgmail: 'Mr.Bean@MinistryofCoffeeandSocialAffairs.gov.uk',
  orgphone: '0132232432',
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

const projectData = {
  DateOfRelevantRepresentationClose: '2024-12-09',
};

jest.mock('../../../src/models', () => {
  // eslint-disable-next-line global-require
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const InterestedParty = dbMock.define('InterestedParty');
  const Project = dbMock.define('Project');

  InterestedParty.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findOne') {
      if (queryOptions[0].where.caseRef === 'EN010009' || queryOptions[0].where.ID === '30000120') {
        return InterestedParty.build({ ...ipDataOwnBehalf });
      }
      if (queryOptions[0].where.ID === '30000135') {
        return InterestedParty.build({ ...ipDataOrgBehalf });
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
  Project.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findOne') {
      if (queryOptions[0].where.CaseReference === 'EN010009') {
        return Project.build({ ...projectData });
      }
      return null;
    }
  });
  const db = {
    InterestedParty,
    Project,
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

describe('confirmEmailAddress on behalf of individual', () => {
  it('should retrieve an interested party by token from mock', async () => {
    const req = httpMocks.createRequest({
      params: {
        token: 'b03bee6bd65cf4d770ee4d8712d4eaef9b78d50a970b51e1',
      },
      body: {
        email: 'david.white@planninginspectorate.gov.uk',
      },
    });

    const res = httpMocks.createResponse();
    await confirmEmailAddress(req, res);
    const data = res._getData();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual({ ...ipDataOwnBehalf, submissionPeriodClosed: false });
  });

  it('should return interested party not found when token is tampered', async () => {
    const req = httpMocks.createRequest({
      params: {
        token: 'b03bee6bd65cf4d770ee4d8712d4eaef9b78d50a970b51e',
      },
      body: {
        email: 'david.white@planninginspectorate.gov.uk',
      },
    });

    const res = httpMocks.createResponse();
    await confirmEmailAddress(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({
      code: 404,
      errors: ['Interested party 3000012 not found'],
    });
  });

  it('should return interested party not found when email does not match', async () => {
    const req = httpMocks.createRequest({
      params: {
        token: 'b03bee6bd65cf4d770ee4d8712d4eaef9b78d50a970b51e1',
      },
      body: {
        email: 'david.white@planninginspectorate.gov.u',
      },
    });

    const res = httpMocks.createResponse();
    await confirmEmailAddress(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({
      code: 404,
      errors: ['Interested party 30000120 not found'],
    });
  });
});

describe('confirmEmailAddress on behalf of organisation', () => {
  it('should retrieve an interested party by token from mock', async () => {
    const req = httpMocks.createRequest({
      params: {
        token: '4ff6ae1e750fac271a3447114397ba37b04c807f07047536',
      },
      body: {
        email: 'Mr.Bean@MinistryofCoffeeandSocialAffairs.gov.uk',
      },
    });

    const res = httpMocks.createResponse();
    await confirmEmailAddress(req, res);
    const data = res._getData();
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual({ ...ipDataOrgBehalf, submissionPeriodClosed: false });
  });
});
