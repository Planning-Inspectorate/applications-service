jest.mock('uuid');

const fetch = require('node-fetch');
const {
	getProjectData,
	getAllProjectList,
	searchDocumentList,
	getRepresentationById,
	getDocumentUriByDocRef,
	handler
} = require('../../../src/lib/application-api-wrapper');

const config = require('../../../src/config');
const { TestServer } = require('./application-api-wrapper.test-server');

config.applications.url = 'http://fake.url';

describe('lib/application-api-wrapper', () => {
	beforeEach(() => {
		fetch.resetMocks();
		fetch.doMock();
	});

	describe('getAllProjectList', () => {
		it(`should call the expected URL`, async () => {
			fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
			await getAllProjectList('?sortBy=-projectName');
			expect(fetch.mock.calls[0][0]).toEqual(
				'http://fake.url/api/v1/applications?sortBy=-projectName'
			);
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
			const searchData = { pageNo: 1, searchTerm: 'test', filters: [] };
			fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
			await searchDocumentList('ABC123', searchData);
			expect(fetch.mock.calls[0][0]).toEqual('http://fake.url/api/v1/documents/ABC123');
		});

		it('should gracefully handle a fetch failure', async () => {
			const searchData = { pageNo: 1, searchTerm: 'test', filters: [] };
			fetch.mockResponseOnce(JSON.stringify({ errors: ['No documents found'] }), {
				status: 404
			});
			try {
				await searchDocumentList('ABC123', searchData);
			} catch (e) {
				expect(e.toString()).toEqual('Error: No documents found');
			}
		});

		it('should gracefully handle a fetch failure', async () => {
			const searchData = { pageNo: 1, searchTerm: 'test', filters: [] };
			fetch.mockResponseOnce(JSON.stringify({ errors: ['Internal server error'] }), {
				status: 500
			});
			try {
				await searchDocumentList('ABC123', searchData);
			} catch (e) {
				expect(e.toString()).toEqual('Error: Internal server error');
			}
		});

		describe('getRepresentationById', () => {
			it(`should call the expected URL`, async () => {
				fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
				await getRepresentationById(9, 'mock-case-reference');
				expect(fetch.mock.calls[0][0]).toEqual(
					'http://fake.url/api/v1/representations/9?caseReference=mock-case-reference'
				);
			});
		});
	});

	describe('getDocumentUriByDocRef', () => {
		it('should call the expected URL', async () => {
			fetch.mockResponseOnce(JSON.stringify({ shouldBe: 'valid' }));
			await getDocumentUriByDocRef('mock-doc-ref');
			expect(fetch.mock.calls[0][0]).toEqual(
				'http://fake.url/api/v3/documents/short-link/mock-doc-ref'
			);
		});
	});

	describe('handle timeouts', () => {
		const server = new TestServer();
		const appUrl = config.applications.url;

		beforeEach(() => {
			fetch.dontMock(); // use real implementation to test timeouts etc..
			config.applications.url = '';
			return new Promise((resolve) => server.start(resolve));
		}, 5000);

		afterEach(() => {
			config.applications.url = appUrl;
			return new Promise((resolve) => server.stop(resolve));
		}, 5000);

		it('returns a fetch response', async () => {
			server.jsonResponse = {
				hello: 'world'
			};
			const res = await handler('test', server.base, 'GET');

			expect(res).toEqual(
				expect.objectContaining({
					resp_code: 200
				})
			);
		});

		it('returns error on timeout', async () => {
			const to = config.applications.timeout;
			config.applications.timeout = 10; // 10 ms
			await expect(async () => {
				await handler('test', server.base + '/timeout?ms=30', 'GET');
			}).rejects.toThrow('aborted');
			config.applications.timeout = to; // reset
		});
	});
});
