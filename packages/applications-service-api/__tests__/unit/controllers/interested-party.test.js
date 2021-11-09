/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
  getInterestedParty,
  createInterestedParty,
} = require('../../../src/controllers/interested-party');

const ipData = {
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
  therep:
    'this is my test that form unchanged for non material change projects after ACR051 developed.  Jun 2021',
  validated: '2021-06-22T14:45:46.000Z',
  emailed: '2021-06-22T14:45:46.000Z',
  exported: null,
  web_ref: 1,
};
const createIp = {
  caseref: 'EN010009',
  behalf: 'me',
  mename: 'Test Name',
  mebuild: 'Test Build',
  mestreet: '',
  metown: 'BRISTOL',
  mecounty: '',
  mecode: 'BS1 6PN',
  mecountry: 'United Kingdom',
  memail: 'test.white@planninginspectorate.gov.uk',
  mephone: '0303 111 111',
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
        return InterestedParty.build({ ...ipData });
      }
      return null;
    }
    if (query === 'create') {
      return InterestedParty.build({ ...createIp });
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
    expect(data).toEqual(ipData);
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

  describe('insertInterestedParty', () => {
    it('should get all applications from mock', async () => {
      const req = httpMocks.createRequest({
        body: {
          ...createIp,
        },
      });
      const res = httpMocks.createResponse();
      await createInterestedParty(req, res);
      const data = res._getData().dataValues;
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
      expect(data).toEqual({ ...createIp });
    });
  });
});
