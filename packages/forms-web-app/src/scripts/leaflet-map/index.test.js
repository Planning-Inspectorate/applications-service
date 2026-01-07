/**
 * @jest-environment jsdom
 */

// Mock leaflet module completely before any requires
jest.doMock(
	'leaflet',
	() => {
		const L = {
			map: jest.fn(() => ({
				getZoom: jest.fn(() => 7),
				addLayer: jest.fn(),
				attributionControl: { setPrefix: jest.fn() }
			})),
			tileLayer: {
				bearer: null
			},
			TileLayer: {
				extend: jest.fn(() => {
					return class MockTileLayer {
						constructor(url, options) {
							this.url = url;
							this.options = options;
						}

						getTileUrl() {
							return this.url;
						}

						addTo() {
							return this;
						}
					};
				})
			},
			marker: jest.fn(() => ({
				bindPopup: jest.fn(function () {
					return this;
				})
			})),
			featureGroup: jest.fn(() => ({
				addLayer: jest.fn()
			})),
			markerClusterGroup: jest.fn(() => ({
				addLayer: jest.fn()
			})),
			divIcon: jest.fn((config) => ({ options: config }))
		};
		return L;
	},
	{ virtual: true }
);

jest.doMock('leaflet.markercluster', () => ({}), { virtual: true });

const mapStateManager = require('../map/map-state-manager');
const LeafletMap = require('./index');

beforeAll(() => {
	global.fetch = jest.fn();
	global.requestAnimationFrame = jest.fn((cb) => cb());
	global.URL = {
		createObjectURL: jest.fn(() => 'blob:mock-url'),
		revokeObjectURL: jest.fn()
	};
	document.body.innerHTML = '<div id="map"></div>';
});

afterEach(() => {
	jest.clearAllMocks();
	mapStateManager.clearMap();
	mapStateManager.clearCache();
});

describe('TokenManager', () => {
	let leafletMap;
	let originalSetTimeout;
	let originalClearTimeout;
	let setTimeoutSpy;
	let clearTimeoutSpy;

	beforeEach(() => {
		leafletMap = new LeafletMap();
		originalSetTimeout = global.setTimeout;
		originalClearTimeout = global.clearTimeout;
		setTimeoutSpy = jest.fn(originalSetTimeout);
		clearTimeoutSpy = jest.fn(originalClearTimeout);
		global.setTimeout = setTimeoutSpy;
		global.clearTimeout = clearTimeoutSpy;
	});

	afterEach(() => {
		leafletMap.tokenManager.destroy();
		global.setTimeout = originalSetTimeout;
		global.clearTimeout = originalClearTimeout;
	});

	describe('Token Fetching', () => {
		it('fetches token from default endpoint', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({ access_token: 'token-123' })
			});

			const token = await leafletMap.tokenManager.fetch();

			expect(global.fetch).toHaveBeenCalledWith('/api/os-maps/token');
			expect(token).toBe('token-123');
		});

		it('fetches token from custom endpoint', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({ access_token: 'custom-token' })
			});

			const token = await leafletMap.tokenManager.fetch('/api/my-token');

			expect(global.fetch).toHaveBeenCalledWith('/api/my-token');
			expect(token).toBe('custom-token');
		});

		it('throws on non-ok response', async () => {
			global.fetch.mockResolvedValueOnce({ ok: false, statusText: 'Unauthorized' });

			await expect(leafletMap.tokenManager.fetch()).rejects.toThrow(
				'Failed to fetch token: Unauthorized'
			);
		});

		it('throws on network error', async () => {
			global.fetch.mockRejectedValueOnce(new Error('Network failed'));

			await expect(leafletMap.tokenManager.fetch()).rejects.toThrow('Network failed');
		});

		it('extracts access_token from JSON response', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'the-token',
					token_type: 'Bearer'
				})
			});

			const token = await leafletMap.tokenManager.fetch();

			expect(token).toBe('the-token');
		});

		it('throws if access_token is missing from response', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({ token_type: 'Bearer' })
			});

			await expect(leafletMap.tokenManager.fetch()).rejects.toThrow('No access token in response');
		});
	});

	describe('Token Refresh Scheduling', () => {
		it('schedules token refresh before expiration', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'token-123',
					token_type: 'Bearer',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();

			// Should schedule refresh at (3600 - 30) * 1000 = 3570000ms
			expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3570000);
		});

		it('does not schedule refresh if expires_in is missing', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'token-123',
					token_type: 'Bearer'
				})
			});

			await leafletMap.tokenManager.fetch();

			expect(setTimeoutSpy).not.toHaveBeenCalled();
		});

		it('clears previous timer when scheduling new refresh', async () => {
			global.fetch.mockResolvedValue({
				ok: true,
				json: jest.fn().mockResolvedValue({
					access_token: 'token',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();
			expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

			await leafletMap.tokenManager.fetch();
			expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
			expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
		});

		it('calculates refresh time as expires_in minus 30 seconds', async () => {
			const testCases = [
				{ expires_in: 3600, expected: 3570000 },
				{ expires_in: 1800, expected: 1770000 },
				{ expires_in: 60, expected: 30000 }
			];

			for (const testCase of testCases) {
				jest.clearAllMocks();
				setTimeoutSpy.mockClear();
				leafletMap = new LeafletMap();

				global.fetch.mockResolvedValueOnce({
					ok: true,
					json: jest.fn().mockResolvedValueOnce({
						access_token: 'token',
						expires_in: testCase.expires_in
					})
				});

				await leafletMap.tokenManager.fetch();
				expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), testCase.expected);

				leafletMap.tokenManager.destroy();
			}
		});
	});

	describe('Token Storage and Retrieval', () => {
		it('stores and retrieves token via getToken()', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'stored-token',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();
			expect(leafletMap.tokenManager.getToken()).toBe('stored-token');
		});

		it('updates token on subsequent fetch', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'first-token',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();
			expect(leafletMap.tokenManager.getToken()).toBe('first-token');

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'second-token',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();
			expect(leafletMap.tokenManager.getToken()).toBe('second-token');
		});
	});

	describe('Cleanup', () => {
		it('destroy clears pending refresh timer', async () => {
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					access_token: 'token',
					expires_in: 3600
				})
			});

			await leafletMap.tokenManager.fetch();
			expect(setTimeoutSpy).toHaveBeenCalled();

			leafletMap.tokenManager.destroy();
			expect(clearTimeoutSpy).toHaveBeenCalled();
		});
	});
});

describe('PopupBuilder', () => {
	let leafletMap;

	beforeEach(() => {
		leafletMap = new LeafletMap();
	});

	describe('HTML Generation', () => {
		it('builds popup with all properties', () => {
			const html = leafletMap.popupBuilder.build({
				projectName: 'Test Project',
				caseRef: 'PR-123',
				stage: 'Pre-Exam',
				summary: 'A summary'
			});

			expect(html).toContain('Test Project');
			expect(html).toContain('PR-123');
			expect(html).toContain('Pre-Exam');
			expect(html).toContain('A summary');
			expect(html).toContain('/projects/PR-123');
		});

		it('uses default values for missing properties', () => {
			const html = leafletMap.popupBuilder.build({});

			expect(html).toContain('Unknown Project');
			expect(html).toContain('Unknown Stage');
		});

		it('omits summary row when empty', () => {
			const withSummary = leafletMap.popupBuilder.build({
				summary: 'Summary here'
			});
			const withoutSummary = leafletMap.popupBuilder.build({
				summary: ''
			});

			expect(withSummary).toContain('cluster-popup-last-row');
			expect(withoutSummary).not.toContain('cluster-popup-last-row');
		});

		it('includes project link in popup', () => {
			const html = leafletMap.popupBuilder.build({
				caseRef: 'REF-999',
				projectName: 'My Project'
			});

			expect(html).toContain('/projects/REF-999');
			expect(html).toContain('href="/projects/REF-999"');
		});

		it('generates valid HTML table structure', () => {
			const html = leafletMap.popupBuilder.build({
				projectName: 'Test'
			});

			expect(html).toContain('<div class="cluster-popup-container">');
			expect(html).toContain('<table class="cluster-popup-table">');
			expect(html).toContain('</table>');
			expect(html).toContain('</div>');
		});
	});

	describe('Text Truncation', () => {
		it('keeps text under limit intact', () => {
			const result = leafletMap.popupBuilder.truncateText('one two three', 5);
			expect(result).toBe('one two three');
		});

		it('truncates text over limit with ellipsis', () => {
			const result = leafletMap.popupBuilder.truncateText('one two three four five', 3);
			expect(result).toBe('one two three...');
		});

		it('handles text at exact word limit', () => {
			const result = leafletMap.popupBuilder.truncateText('one two three', 3);
			expect(result).toBe('one two three');
		});

		it('handles single word', () => {
			const result = leafletMap.popupBuilder.truncateText('hello', 2);
			expect(result).toBe('hello');
		});

		it('returns empty string for empty input', () => {
			const result = leafletMap.popupBuilder.truncateText('', 5);
			expect(result).toBe('');
		});

		it('returns empty for non-string input', () => {
			expect(leafletMap.popupBuilder.truncateText(null, 5)).toBe('');
			expect(leafletMap.popupBuilder.truncateText(undefined, 5)).toBe('');
			expect(leafletMap.popupBuilder.truncateText(123, 5)).toBe('');
		});

		it('handles excessive whitespace', () => {
			const result = leafletMap.popupBuilder.truncateText('  one  two  ', 1);
			expect(result).toBe('one...');
		});

		it('truncates long summary to 25 words in popup', () => {
			const words = Array(30)
				.fill(0)
				.map((_, i) => `word${i}`)
				.join(' ');

			const truncated = leafletMap.popupBuilder.truncateText(words, 25);
			expect(truncated).toContain('...');
			// 25 words + "..." becomes 26 parts when split by space, but "..." is a single part
			expect(truncated.split(' ').length).toBe(25);
		});
	});
});

describe('MarkerLoader', () => {
	let leafletMap;

	beforeEach(() => {
		leafletMap = new LeafletMap();
		global.requestAnimationFrame = jest.fn((cb) => cb());
	});

	describe('Marker Processing', () => {
		it('processes valid markers', () => {
			const markers = [
				{
					geometry: { coordinates: [0, 51.5] },
					properties: { projectName: 'P1', caseRef: 'REF1' }
				}
			];

			expect(() => {
				leafletMap.markerLoader.load(
					{
						addLayer: jest.fn()
					},
					{ markers, clustered: false }
				);
			}).not.toThrow();
		});

		it('handles empty marker array', () => {
			const mockMap = { addLayer: jest.fn() };
			leafletMap.markerLoader.load(mockMap, { markers: [], clustered: false });
			expect(mockMap.addLayer).not.toHaveBeenCalled();
		});

		it('handles missing markers property', () => {
			const mockMap = { addLayer: jest.fn() };
			expect(() => {
				leafletMap.markerLoader.load(mockMap, { clustered: false });
			}).not.toThrow();
		});

		it('uses batch processing for large datasets', () => {
			const markers = Array(25)
				.fill(0)
				.map((_, i) => ({
					geometry: { coordinates: [i, i] },
					properties: { projectName: `P${i}` }
				}));

			leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });

			// Should use requestAnimationFrame for batching
			expect(global.requestAnimationFrame.mock.calls.length).toBeGreaterThanOrEqual(1);
		});

		it('has batch size of 10', () => {
			expect(leafletMap.markerLoader.BATCH_SIZE).toBe(10);
		});
	});

	describe('Marker Validation', () => {
		it('skips markers missing geometry', () => {
			const markers = [
				{ properties: { projectName: 'Invalid' } },
				{ geometry: { coordinates: [0, 51.5] }, properties: { projectName: 'Valid' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});

		it('skips markers missing coordinates', () => {
			const markers = [
				{ geometry: {}, properties: { projectName: 'Invalid' } },
				{ geometry: { coordinates: [0, 51.5] }, properties: { projectName: 'Valid' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});

		it('skips markers missing properties', () => {
			const markers = [
				{ geometry: { coordinates: [0, 51.5] } },
				{ geometry: { coordinates: [1, 52] }, properties: { projectName: 'Valid' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});

		it('skips markers with non-finite coordinates', () => {
			const markers = [
				{ geometry: { coordinates: [NaN, 51.5] }, properties: {} },
				{ geometry: { coordinates: [0, Infinity] }, properties: {} },
				{ geometry: { coordinates: [0, 51.5] }, properties: { projectName: 'Valid' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});

		it('handles zero coordinates', () => {
			const markers = [
				{ geometry: { coordinates: [0, 0] }, properties: { projectName: 'Origin' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});

		it('handles extreme coordinates', () => {
			const markers = [
				{ geometry: { coordinates: [-180, -90] }, properties: { projectName: 'SW' } },
				{ geometry: { coordinates: [180, 90] }, properties: { projectName: 'NE' } }
			];

			expect(() => {
				leafletMap.markerLoader.load({ addLayer: jest.fn() }, { markers, clustered: false });
			}).not.toThrow();
		});
	});

	describe('Icon Configuration', () => {
		it('returns icon with correct class', () => {
			const icon = leafletMap.markerLoader.getIcon();
			expect(icon.options.className).toBe('projects-marker');
		});

		it('icon has correct size properties', () => {
			const icon = leafletMap.markerLoader.getIcon();
			expect(icon.options.iconSize).toEqual([25, 41]);
			expect(icon.options.iconAnchor).toEqual([12.5, 41]);
			expect(icon.options.popupAnchor).toEqual([0, -35]);
		});

		it('icon contains HTML', () => {
			const icon = leafletMap.markerLoader.getIcon();
			expect(icon.options.html).toContain('projects-marker-icon');
		});
	});
});

describe('LeafletMap Full Integration', () => {
	beforeEach(() => {
		global.fetch.mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue({ access_token: 'test-token' })
		});
	});

	describe('Initialization', () => {
		it('initializes map with configuration', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7, attributionControl: true },
				tileLayer: {
					url: 'https://api.os.uk/{z}/{x}/{y}.png',
					tokenEndpoint: '/api/os-maps/token',
					options: { maxZoom: 20 }
				},
				markers: [],
				clustered: true
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(map).toBeDefined();
			expect(mapStateManager.getMap()).toBe(map);
		});

		it('initializes cache with 100 tile max', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: []
			};

			const leafletMap = new LeafletMap();
			await leafletMap.initiate(config);

			expect(mapStateManager.hasCache()).toBe(true);
			const stats = await mapStateManager.getCacheStats();
			expect(stats.maxSize).toBe(100);
		});

		it('fetches token from configured endpoint', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: {
					url: 'https://api.test/{z}/{x}/{y}.png',
					tokenEndpoint: '/api/custom-token',
					options: {}
				},
				markers: []
			};

			const leafletMap = new LeafletMap();
			await leafletMap.initiate(config);

			expect(global.fetch).toHaveBeenCalledWith('/api/custom-token');
		});

		it('customizes attribution control when enabled', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7, attributionControl: true },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: []
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(map.attributionControl.setPrefix).toHaveBeenCalledWith(false);
		});

		it('returns map instance', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: []
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(typeof map.getZoom).toBe('function');
		});

		it('stores map in state manager', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: []
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(mapStateManager.getMap()).toBe(map);
			expect(mapStateManager.hasMap()).toBe(true);
		});

		it('throws on token fetch failure', async () => {
			global.fetch.mockRejectedValueOnce(new Error('Token service down'));

			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: []
			};

			const leafletMap = new LeafletMap();
			await expect(leafletMap.initiate(config)).rejects.toThrow('Token service down');
		});

		it('loads markers from config', async () => {
			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers: [
					{
						geometry: { coordinates: [0, 51.5] },
						properties: { projectName: 'Project 1', caseRef: 'PR001' }
					}
				],
				clustered: true
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(map).toBeDefined();
		});
	});

	describe('Dependency Structure', () => {
		it('creates token manager', () => {
			const leafletMap = new LeafletMap();
			expect(leafletMap.tokenManager).toBeDefined();
		});

		it('creates popup builder', () => {
			const leafletMap = new LeafletMap();
			expect(leafletMap.popupBuilder).toBeDefined();
		});

		it('creates marker loader', () => {
			const leafletMap = new LeafletMap();
			expect(leafletMap.markerLoader).toBeDefined();
		});

		it('injects popup builder into marker loader', () => {
			const leafletMap = new LeafletMap();
			expect(leafletMap.markerLoader.popupBuilder).toBe(leafletMap.popupBuilder);
		});
	});

	describe('Edge Cases', () => {
		it('handles 1000+ markers with batching', async () => {
			global.requestAnimationFrame = jest.fn((cb) => cb());

			const markers = Array(1500)
				.fill(0)
				.map((_, i) => ({
					geometry: { coordinates: [(i % 180) - 90, (i % 90) - 45] },
					properties: { projectName: `P${i}`, caseRef: `REF${i}` }
				}));

			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers,
				clustered: true
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(map).toBeDefined();
			expect(global.requestAnimationFrame.mock.calls.length).toBeGreaterThan(50);
		});

		it('handles mixed valid and invalid markers', async () => {
			const markers = [
				null,
				{ geometry: { coordinates: [0, 51.5] }, properties: { projectName: 'Valid' } },
				{ geometry: {} },
				undefined,
				{ geometry: { coordinates: [NaN, 51.5] }, properties: {} },
				{ geometry: { coordinates: [1, 52] }, properties: { projectName: 'Valid 2' } }
			];

			const config = {
				elementId: 'map',
				mapOptions: { center: [55, -2], zoom: 7 },
				tileLayer: { url: 'https://api.test/{z}/{x}/{y}.png', options: {} },
				markers,
				clustered: false
			};

			const leafletMap = new LeafletMap();
			const map = await leafletMap.initiate(config);

			expect(map).toBeDefined();
		});
	});
});
