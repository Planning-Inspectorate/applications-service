jest.mock('uuid');

const fetch = require('node-fetch');
const uuid = require('uuid');
const {
  getProjectData,
  getAllProjectList,
  searchDocumentList,
} = require('../../../src/lib/application-api-wrapper');

const config = require('../../../src/config');

const mockLogger = jest.fn();
jest.mock('../../../src/lib/logger', () => ({
  child: () => ({
    debug: mockLogger,
    error: mockLogger,
    warn: mockLogger,
  }),
}));

config.applications.url = 'http://fake.url';

describe('lib/application-api-wrapper', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.doMock();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getAllProjectList', () => {
    it(`should call the expected URL`, async () => {
      fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
      await getAllProjectList();
      expect(fetch.mock.calls[0][0]).toEqual('http://fake.url/api/v1/applications');
    });
  });

  describe('getProjectData', () => {
    it(`should call the expected URL`, async () => {
      fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
      await getProjectData('ABC123');
      expect(fetch.mock.calls[0][0]).toEqual('http://fake.url/api/v1/applications/ABC123');
    });
  });

  describe('searchDocumentList', () => {
    it(`should call the expected URL`, async () => {
      const search_data = { pageNo: 1, searchTerm: 'test', filters: [] };
      fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
      await searchDocumentList('ABC123', search_data);
      expect(fetch.mock.calls[0][0]).toEqual('http://fake.url/api/v1/documents/ABC123');
    });

    it('should gracefully handle a fetch failure', async () => {
      const search_data = { pageNo: 1, searchTerm: 'test', filters: [] };
      fetch.mockResponseOnce(JSON.stringify({ errors: ['No documents found'] }), {
        status: 404,
      });
      try {
        await searchDocumentList('ABC123', search_data);
      } catch (e) {
        expect(e.toString()).toEqual('Error: No documents found');
      }
    });

    it('should gracefully handle a fetch failure', async () => {
      const search_data = { pageNo: 1, searchTerm: 'test', filters: [] };
      fetch.mockResponseOnce(JSON.stringify({ errors: ['Internal server error'] }), {
        status: 500,
      });
      try {
        await searchDocumentList('ABC123', search_data);
      } catch (e) {
        expect(e.toString()).toEqual('Error: Internal server error');
      }
    });
  });
});
