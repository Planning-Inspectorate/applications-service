/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getDocuments, getV2Documents } = require('../../../src/controllers/documents');

const documentListWrapper = {
  documents: [
    {
      1: {
        Dave: [
          {
            id: 76320,
            dataID: 'TR0100012',
            case_reference: 'EN010009',
            Stage: 1,
            type: 'Dave',
            filter_1: 'CR-1234-A',
            filter_2: '',
            category: '',
            description: '',
            size: 412846,
            mime: 'application/pdf',
            path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
            status: 'Published',
            date_published: '2019-10-10',
            deadline_date: null,
            personal_name: '122',
            representative: '',
            who_from: null,
            doc_reference: null,
            author: null,
            details: null,
            last_modified: '2019-11-27 12:25:41',
            date_created: '2019-11-06 15:19:51',
          },
        ],
        Correspondence: [
          {
            id: 76322,
            dataID: 'EN010009-000008',
            case_reference: 'EN010009',
            Stage: 1,
            type: 'Correspondence',
            filter_1: 'Webfilter1',
            filter_2: '',
            category: '',
            description: 'stuff',
            size: 0,
            mime: '',
            path: null,
            status: 'Published',
            date_published: '2017-08-15',
            deadline_date: null,
            personal_name: 'Barry',
            representative: '',
            who_from: null,
            doc_reference: null,
            author: null,
            details: null,
            last_modified: '2019-11-27 12:20:52',
            date_created: '2019-11-27 12:20:52',
          },
        ],
      },
    },
    {
      4: {
        'Rule 6 letter - notification of the preliminary meeting and matters to be discussed': [
          {
            id: 76321,
            dataID: 'EN010009-000006',
            case_reference: 'EN010009',
            Stage: 4,
            type: 'Rule 6 letter - notification of the preliminary meeting and matters to be discussed',
            filter_1: 'Filter 1',
            filter_2: '',
            category: '',
            description: 'a rule 6 letter',
            size: 0,
            mime: '',
            path: null,
            status: 'Published',
            date_published: '2015-12-10',
            deadline_date: null,
            personal_name: 'David',
            representative: '',
            who_from: null,
            doc_reference: null,
            author: null,
            details: null,
            last_modified: '2019-11-27 12:20:51',
            date_created: '2019-11-27 12:20:51',
          },
        ],
      },
    },
  ],
  totalItems: 7,
  itemsPerPage: 3,
  totalPages: 3,
  currentPage: 1,
};

// eslint-disable-next-line no-unused-vars
const v2DocumentListWrapper = {
  documents: [
    {
      id: 76320,
      dataID: 'TR0100012',
      case_reference: 'EN010009',
      Stage: 1,
      type: 'Dave',
      filter_1: 'CR-1234-A',
      filter_2: '',
      category: '',
      description: '',
      size: 412846,
      mime: 'application/pdf',
      path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
      status: 'Published',
      date_published: '2019-10-10',
      deadline_date: null,
      personal_name: '122',
      representative: '',
      who_from: null,
      doc_reference: null,
      author: null,
      details: null,
      last_modified: '2019-11-27 12:25:41',
      date_created: '2019-11-06 15:19:51',
    },
    {
      id: 76325,
      dataID: 'EN010009-000030',
      case_reference: 'EN010009',
      Stage: 1,
      type: 'Additional Submissions',
      filter_1: 'David Webfilter 1',
      filter_2: 'David Webfilter 2',
      category: '',
      description: 'my doc description English name',
      size: 0,
      mime: '',
      path: null,
      status: 'Published',
      date_published: '2017-07-05',
      deadline_date: null,
      personal_name: 'Submission from David 1627',
      representative: '',
      who_from: null,
      doc_reference: null,
      author: null,
      details: null,
      last_modified: '2019-11-27 12:20:53',
      date_created: '2019-11-27 12:20:53',
    },
  ],
  totalItems: 2,
  itemsPerPage: 3,
  totalPages: 1,
  currentPage: 1,
  filters: {
    stageFilters: [],
    typeFilters: [],
  },
};

const mockDataV1 = {
  count: 7,
  rows: [
    {
      dataValues: {
        id: 76320,
        dataID: 'TR0100012',
        case_reference: 'EN010009',
        Stage: 1,
        type: 'Dave',
        filter_1: 'CR-1234-A',
        filter_2: '',
        category: '',
        description: '',
        size: 412846,
        mime: 'application/pdf',
        path: 'EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
        status: 'Published',
        date_published: '2019-10-10',
        deadline_date: null,
        personal_name: '122',
        representative: '',
        who_from: null,
        doc_reference: null,
        author: null,
        details: null,
        last_modified: '2019-11-27 12:25:41',
        date_created: '2019-11-06 15:19:51',
      },
    },
    {
      dataValues: {
        id: 76321,
        dataID: 'EN010009-000006',
        case_reference: 'EN010009',
        Stage: 4,
        type: 'Rule 6 letter - notification of the preliminary meeting and matters to be discussed',
        filter_1: 'Filter 1',
        filter_2: '',
        category: '',
        description: 'a rule 6 letter',
        size: 0,
        mime: '',
        path: null,
        status: 'Published',
        date_published: '2015-12-10',
        deadline_date: null,
        personal_name: 'David',
        representative: '',
        who_from: null,
        doc_reference: null,
        author: null,
        details: null,
        last_modified: '2019-11-27 12:20:51',
        date_created: '2019-11-27 12:20:51',
      },
    },
    {
      dataValues: {
        id: 76322,
        dataID: 'EN010009-000008',
        case_reference: 'EN010009',
        Stage: 1,
        type: 'Correspondence',
        filter_1: 'Webfilter1',
        filter_2: '',
        category: '',
        description: 'stuff',
        size: 0,
        mime: '',
        path: null,
        status: 'Published',
        date_published: '2017-08-15',
        deadline_date: null,
        personal_name: 'Barry',
        representative: '',
        who_from: null,
        doc_reference: null,
        author: null,
        details: null,
        last_modified: '2019-11-27 12:20:52',
        date_created: '2019-11-27 12:20:52',
      },
    },
  ],
};

const documentSearchListWrapper = {
  documents: [
    {
      1: {
        Dave: [
          {
            id: 76320,
            dataID: 'TR0100012',
            case_reference: 'EN010009',
            Stage: 1,
            type: 'Dave',
            filter_1: 'CR-1234-A',
            filter_2: '',
            category: '',
            description: '',
            size: 412846,
            mime: 'application/pdf',
            path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
            status: 'Published',
            date_published: '2019-10-10',
            deadline_date: null,
            personal_name: '122',
            representative: '',
            who_from: null,
            doc_reference: null,
            author: null,
            details: null,
            last_modified: '2019-11-27 12:25:41',
            date_created: '2019-11-06 15:19:51',
          },
        ],
        'Additional Submissions': [
          {
            id: 76325,
            dataID: 'EN010009-000030',
            case_reference: 'EN010009',
            Stage: 1,
            type: 'Additional Submissions',
            filter_1: 'David Webfilter 1',
            filter_2: 'David Webfilter 2',
            category: '',
            description: 'my doc description English name',
            size: 0,
            mime: '',
            path: null,
            status: 'Published',
            date_published: '2017-07-05',
            deadline_date: null,
            personal_name: 'Submission from David 1627',
            representative: '',
            who_from: null,
            doc_reference: null,
            author: null,
            details: null,
            last_modified: '2019-11-27 12:20:53',
            date_created: '2019-11-27 12:20:53',
          },
        ],
      },
    },
  ],
  totalItems: 2,
  itemsPerPage: 3,
  totalPages: 1,
  currentPage: 1,
};

const mockDataForSearch = {
  count: 2,
  rows: [
    {
      dataValues: {
        id: 76320,
        dataID: 'TR0100012',
        case_reference: 'EN010009',
        Stage: 1,
        type: 'Dave',
        filter_1: 'CR-1234-A',
        filter_2: '',
        category: '',
        description: '',
        size: 412846,
        mime: 'application/pdf',
        path: 'EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
        status: 'Published',
        date_published: '2019-10-10',
        deadline_date: null,
        personal_name: '122',
        representative: '',
        who_from: null,
        doc_reference: null,
        author: null,
        details: null,
        last_modified: '2019-11-27 12:25:41',
        date_created: '2019-11-06 15:19:51',
      },
    },
    {
      dataValues: {
        id: 76325,
        dataID: 'EN010009-000030',
        case_reference: 'EN010009',
        Stage: 1,
        type: 'Additional Submissions',
        filter_1: 'David Webfilter 1',
        filter_2: 'David Webfilter 2',
        category: '',
        description: 'my doc description English name',
        size: 0,
        mime: '',
        path: null,
        status: 'Published',
        date_published: '2017-07-05',
        deadline_date: null,
        personal_name: 'Submission from David 1627',
        representative: '',
        who_from: null,
        doc_reference: null,
        author: null,
        details: null,
        last_modified: '2019-11-27 12:20:53',
        date_created: '2019-11-27 12:20:53',
      },
    },
  ],
};

const v2DocumentListWrapperNoResults = {
  documents: [],
  totalItems: 0,
  itemsPerPage: 3,
  totalPages: 1,
  currentPage: 1,
  filters: {
    stageFilters: [],
    typeFilters: [],
  },
};

jest.mock('../../../src/models', () => {
  // eslint-disable-next-line global-require
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const Document = dbMock.define('Document');

  // eslint-disable-next-line consistent-return
  Document.$queryInterface.$useHandler((query, queryOptions) => {
    // eslint-disable-next-line global-require
    const { Op } = require('sequelize');
    const simpleQuery = typeof queryOptions[0].where.case_reference !== 'undefined';
    const caseRef = simpleQuery
      ? queryOptions[0].where.case_reference
      : queryOptions[0].where[Op.and][0].case_reference;

    if (query === 'findAndCountAll') {
      if (caseRef === 'EN010009') {
        if (simpleQuery) {
          return Document.build({ ...mockDataV1 });
        }
        return Document.build({ ...mockDataForSearch });
      }
      if (caseRef === 'EN000000') {
        return Document.build({ rows: [], count: 0 });
      }
      if (caseRef === 'ENF0000F') {
        return null;
      }
    }
    throw new Error(`No mock handler defined for ${query} method with specified queryOptions`);
  });
  const db = {
    Document,
  };
  return db;
});

jest.mock('../../../src/lib/config.js', () => ({
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    redact: ['config.services.notify.apiKey'],
  },
  itemsPerPage: 3,
  documentsHost: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/',
}));

jest.mock('../../../src/services/document.service', () => {
  const originalModule = jest.requireActual('../../../src/services/document.service');

  // Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getFilters: jest.fn(() => Promise.resolve([])),
  };
});

describe('getDocuments', () => {
  it('should get documents from mock', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'EN010009',
      },
      body: {
        pageNo: 1,
        searchTerm: '',
      },
    });

    const res = httpMocks.createResponse();
    await getDocuments(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(documentListWrapper);
  });

  it('should return documents not found', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'EN000000',
      },
      body: {},
    });

    const res = httpMocks.createResponse();
    await getDocuments(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({ code: StatusCodes.NOT_FOUND, errors: ['No documents found'] });
  });

  it('should return internal server error', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'ENF0000F',
      },
      body: {},
    });

    const res = httpMocks.createResponse();
    await getDocuments(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res._getData()).toContain(
      `Problem getting documents for project ENF0000F \n TypeError:`
    );
  });

  it('should get documents from mock by search criteria', async () => {
    const req = httpMocks.createRequest({
      params: {
        caseRef: 'EN010009',
      },
      body: {
        pageNo: 1,
        searchTerm: 'CR',
      },
    });

    const res = httpMocks.createResponse();
    await getDocuments(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(documentSearchListWrapper);
  });
});

describe('getV2Documents', () => {
  it('should get documents from mock', async () => {
    const req = httpMocks.createRequest({
      query: {
        caseRef: 'EN010009',
      },
    });

    const res = httpMocks.createResponse();
    await getV2Documents(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(v2DocumentListWrapper);
  });

  it('should return required query parameter missing', async () => {
    const req = httpMocks.createRequest({
      query: {},
    });

    const res = httpMocks.createResponse();
    try {
      await getV2Documents(req, res);
    } catch (e) {
      expect(e.code).toEqual(StatusCodes.BAD_REQUEST);
      expect(e.message).toEqual('Required query parameter caseRef missing');
    }
  });

  it('should return an empty list when no documents found', async () => {
    const req = httpMocks.createRequest({
      query: {
        caseRef: 'EN000000',
      },
    });

    const res = httpMocks.createResponse();
    await getV2Documents(req, res);
    const data = res._getData();
    expect(res._getStatusCode()).toEqual(StatusCodes.OK);
    expect(data).toEqual(v2DocumentListWrapperNoResults);
  });

  it('should return internal server error', async () => {
    const req = httpMocks.createRequest({
      query: {
        caseRef: 'ENF0000F',
      },
    });

    const res = httpMocks.createResponse();
    await getV2Documents(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res._getData()).toContain(`Problem getting documents for project ENF0000F`);
  });
});
