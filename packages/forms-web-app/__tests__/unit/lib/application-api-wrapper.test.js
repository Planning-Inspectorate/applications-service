jest.mock('uuid');

const fetch = require('node-fetch');
const uuid = require('uuid');
const {
  getProjectData,
  getAllProjectList,
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
});
