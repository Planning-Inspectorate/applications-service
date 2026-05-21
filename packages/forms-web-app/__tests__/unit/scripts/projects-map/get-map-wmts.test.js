/**
 * @fileoverview Unit tests for {@link module:scripts/projects-map/tile-layer} (`getMapWMTS`).
 */
'use strict';

/* global fetchMock */
const { getMapWMTS } = require('../../../../src/scripts/projects-map/tile-layer');
const { WMTS_CAPABILITIES_URL } = require('../../../../src/scripts/projects-map/constants');

describe('getMapWMTS', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('sends a request to the OS WMTS capabilities URL', async () => {
		fetchMock.mockResponseOnce('<WMTSCapabilities/>');
		await getMapWMTS('test-token');
		expect(fetchMock).toHaveBeenCalledWith(WMTS_CAPABILITIES_URL, expect.anything());
	});

	it('sends an Authorization: Bearer header with the access token', async () => {
		fetchMock.mockResponseOnce('<WMTSCapabilities/>');
		await getMapWMTS('my-token');
		const [, init] = fetchMock.mock.calls[0];
		expect(init.headers.Authorization).toBe('Bearer my-token');
	});

	it('returns the response body as text on success', async () => {
		fetchMock.mockResponseOnce('<WMTSCapabilities version="1.0.0"/>');
		const result = await getMapWMTS('token');
		expect(result).toBe('<WMTSCapabilities version="1.0.0"/>');
	});

	it('throws with the HTTP status when the response is not OK (401)', async () => {
		fetchMock.mockResponseOnce('Unauthorized', { status: 401 });
		await expect(getMapWMTS('bad-token')).rejects.toThrow('WMTS GetCapabilities failed: 401');
	});

	it('throws with the HTTP status when the response is not OK (500)', async () => {
		fetchMock.mockResponseOnce('Server Error', { status: 500 });
		await expect(getMapWMTS('token')).rejects.toThrow('WMTS GetCapabilities failed: 500');
	});
});
