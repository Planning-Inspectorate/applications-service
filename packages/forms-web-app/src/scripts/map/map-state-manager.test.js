const mapStateManager = require('./map-state-manager');

describe('scripts/map/map-state-manager', () => {
	beforeEach(async () => {
		mapStateManager.clearMap();
		await mapStateManager.clearCache();
	});

	describe('Map Instance Management', () => {
		it('stores and retrieves Leaflet map instance', () => {
			const mockMap = { getZoom: jest.fn(() => 7) };

			mapStateManager.setMap(mockMap);

			expect(mapStateManager.getMap()).toBe(mockMap);
			expect(mapStateManager.hasMap()).toBe(true);
		});

		it('throws error on invalid map instance', () => {
			expect(() => mapStateManager.setMap(null)).toThrow('Invalid Leaflet map instance');
			expect(() => mapStateManager.setMap({})).toThrow('Invalid Leaflet map instance');
			expect(() => mapStateManager.setMap({ getZoom: 'string' })).toThrow();
			expect(mapStateManager.hasMap()).toBe(false);
		});

		it('clears map instance completely', () => {
			const mockMap = { getZoom: jest.fn() };
			mapStateManager.setMap(mockMap);
			expect(mapStateManager.hasMap()).toBe(true);

			mapStateManager.clearMap();

			expect(mapStateManager.getMap()).toBeNull();
			expect(mapStateManager.hasMap()).toBe(false);
		});

		it('returns null when no map initialized', () => {
			expect(mapStateManager.getMap()).toBeNull();
		});
	});

	describe('Cache Initialization', () => {
		it('initializes cache with custom max size', async () => {
			await mapStateManager.initCache(50);

			expect(mapStateManager.hasCache()).toBe(true);
			const stats = await mapStateManager.getCacheStats();
			expect(stats.maxSize).toBe(50);
			expect(stats.size).toBe(0);
		});

		it('initializes cache with default size 100', async () => {
			await mapStateManager.initCache();

			expect(mapStateManager.hasCache()).toBe(true);
			const stats = await mapStateManager.getCacheStats();
			expect(stats.maxSize).toBe(100);
		});

		it('reinitialize replaces existing cache', async () => {
			await mapStateManager.initCache(10);
			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));

			await mapStateManager.initCache(20);
			const stats = await mapStateManager.getCacheStats();

			expect(stats.maxSize).toBe(20);
			expect(stats.size).toBe(0);
		});

		it('returns hasCache false before initialization', () => {
			expect(mapStateManager.hasCache()).toBe(false);
		});
	});

	describe('Tile Storage and Retrieval', () => {
		beforeEach(async () => {
			await mapStateManager.initCache(100);
		});

		it('stores and retrieves exact tile data', async () => {
			const data = new ArrayBuffer(256);
			const view = new Uint8Array(data);
			view[0] = 42;

			await mapStateManager.setTile(7, 64, 42, data);
			const retrieved = await mapStateManager.getTile(7, 64, 42);

			expect(retrieved).toBe(data);
			expect(new Uint8Array(retrieved)[0]).toBe(42);
		});

		it('returns null for non-existent tile', async () => {
			const result = await mapStateManager.getTile(7, 999, 999);
			expect(result).toBeNull();
		});

		it('distinguishes tiles by all three coordinates (z/x/y)', async () => {
			const tile1 = new ArrayBuffer(10);
			const tile2 = new ArrayBuffer(20);
			const tile3 = new ArrayBuffer(30);

			await mapStateManager.setTile(7, 64, 42, tile1);
			await mapStateManager.setTile(7, 64, 43, tile2);
			await mapStateManager.setTile(8, 64, 42, tile3);

			expect(await mapStateManager.getTile(7, 64, 42)).toBe(tile1);
			expect(await mapStateManager.getTile(7, 64, 43)).toBe(tile2);
			expect(await mapStateManager.getTile(8, 64, 42)).toBe(tile3);
		});

		it('overwrites tile with same coordinates', async () => {
			const oldData = new ArrayBuffer(10);
			const newData = new ArrayBuffer(20);

			await mapStateManager.setTile(7, 64, 42, oldData);
			await mapStateManager.setTile(7, 64, 42, newData);

			expect(await mapStateManager.getTile(7, 64, 42)).toBe(newData);
		});

		it('stores multiple different tiles', async () => {
			const tiles = [];
			for (let i = 0; i < 5; i++) {
				const data = new ArrayBuffer(100 + i);
				tiles.push(data);
				await mapStateManager.setTile(7, i, i, data);
			}

			for (let i = 0; i < 5; i++) {
				expect(await mapStateManager.getTile(7, i, i)).toBe(tiles[i]);
			}
		});
	});

	describe('Cache Capacity and LRU Eviction', () => {
		it('evicts oldest tile when cache reaches max size', async () => {
			await mapStateManager.initCache(3);
			const tile1 = new ArrayBuffer(10);
			const tile2 = new ArrayBuffer(20);
			const tile3 = new ArrayBuffer(30);
			const tile4 = new ArrayBuffer(40);

			await mapStateManager.setTile(7, 0, 0, tile1);
			await mapStateManager.setTile(7, 1, 1, tile2);
			await mapStateManager.setTile(7, 2, 2, tile3);
			await mapStateManager.setTile(7, 3, 3, tile4);

			expect(await mapStateManager.getTile(7, 0, 0)).toBeNull();
			expect(await mapStateManager.getTile(7, 1, 1)).toBe(tile2);
			expect(await mapStateManager.getTile(7, 2, 2)).toBe(tile3);
			expect(await mapStateManager.getTile(7, 3, 3)).toBe(tile4);
		});

		it('maintains correct cache size after eviction', async () => {
			await mapStateManager.initCache(3);

			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(10));
			await mapStateManager.setTile(7, 1, 1, new ArrayBuffer(20));
			await mapStateManager.setTile(7, 2, 2, new ArrayBuffer(30));

			let stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(3);

			await mapStateManager.setTile(7, 3, 3, new ArrayBuffer(40));

			stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(3);
		});

		it('fills cache to exact max size', async () => {
			await mapStateManager.initCache(5);

			for (let i = 0; i < 5; i++) {
				await mapStateManager.setTile(7, i, i, new ArrayBuffer(100));
			}

			const stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(5);
			expect(stats.maxSize).toBe(5);
		});

		it('handles single-tile cache', async () => {
			await mapStateManager.initCache(1);
			const tile1 = new ArrayBuffer(10);
			const tile2 = new ArrayBuffer(20);

			await mapStateManager.setTile(7, 0, 0, tile1);
			expect(await mapStateManager.getTile(7, 0, 0)).toBe(tile1);

			await mapStateManager.setTile(7, 1, 1, tile2);
			expect(await mapStateManager.getTile(7, 0, 0)).toBeNull();
			expect(await mapStateManager.getTile(7, 1, 1)).toBe(tile2);
		});
	});

	describe('Cache Statistics', () => {
		it('reports correct size and capacity', async () => {
			await mapStateManager.initCache(10);

			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));
			await mapStateManager.setTile(7, 1, 1, new ArrayBuffer(100));

			const stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(2);
			expect(stats.maxSize).toBe(10);
		});

		it('calculates correct fill percentage', async () => {
			await mapStateManager.initCache(10);

			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));
			const stats = await mapStateManager.getCacheStats();
			expect(stats.filled).toBe('10%');
		});

		it('reports 0% when cache empty', async () => {
			await mapStateManager.initCache(10);
			const stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(0);
			expect(stats.filled).toBe('0%');
		});

		it('reports 100% when cache full', async () => {
			await mapStateManager.initCache(3);
			for (let i = 0; i < 3; i++) {
				await mapStateManager.setTile(7, i, i, new ArrayBuffer(100));
			}

			const stats = await mapStateManager.getCacheStats();
			expect(stats.filled).toBe('100%');
		});

		it('returns null stats when cache not initialized', async () => {
			const stats = await mapStateManager.getCacheStats();
			expect(stats).toBeNull();
		});
	});

	describe('Cache Clearing', () => {
		it('clears all tiles from cache', async () => {
			await mapStateManager.initCache(10);
			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));
			await mapStateManager.setTile(7, 1, 1, new ArrayBuffer(100));

			await mapStateManager.clearCache();

			expect(mapStateManager.hasCache()).toBe(false);
			expect(await mapStateManager.getTile(7, 0, 0)).toBeNull();
		});

		it('renders cache unusable after clear', async () => {
			await mapStateManager.initCache(10);
			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));

			await mapStateManager.clearCache();

			await mapStateManager.setTile(7, 1, 1, new ArrayBuffer(100));
			expect(await mapStateManager.getTile(7, 1, 1)).toBeNull();
		});

		it('allows reinitialize after clear', async () => {
			await mapStateManager.initCache(10);
			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));
			await mapStateManager.clearCache();

			await mapStateManager.initCache(5);
			await mapStateManager.setTile(7, 1, 1, new ArrayBuffer(100));

			expect(await mapStateManager.getTile(7, 1, 1)).toEqual(new ArrayBuffer(100));
		});
	});

	describe('Graceful Behavior Without Initialization', () => {
		it('getTile returns null without init', async () => {
			const result = await mapStateManager.getTile(7, 0, 0);
			expect(result).toBeNull();
		});

		it('setTile completes without error', async () => {
			await expect(mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100))).resolves.toBeUndefined();
		});

		it('getCacheStats returns null without init', async () => {
			const stats = await mapStateManager.getCacheStats();
			expect(stats).toBeNull();
		});

		it('clearCache completes safely without init', async () => {
			await expect(mapStateManager.clearCache()).resolves.toBeUndefined();
		});
	});

	describe('Edge Cases', () => {
		beforeEach(async () => {
			await mapStateManager.initCache(100);
		});

		it('stores zero-byte tile', async () => {
			const empty = new ArrayBuffer(0);
			await mapStateManager.setTile(7, 0, 0, empty);
			expect(await mapStateManager.getTile(7, 0, 0)).toBe(empty);
		});

		it('stores large tile (1MB)', async () => {
			const large = new ArrayBuffer(1024 * 1024);
			await mapStateManager.setTile(7, 0, 0, large);
			expect(await mapStateManager.getTile(7, 0, 0)).toBe(large);
		});

		it('handles large coordinate values', async () => {
			const data = new ArrayBuffer(100);
			const maxCoord = 2147483647; // Max 32-bit int

			await mapStateManager.setTile(28, maxCoord, maxCoord, data);
			expect(await mapStateManager.getTile(28, maxCoord, maxCoord)).toBe(data);
		});

		it('handles zero coordinates', async () => {
			const data = new ArrayBuffer(100);
			await mapStateManager.setTile(0, 0, 0, data);
			expect(await mapStateManager.getTile(0, 0, 0)).toBe(data);
		});

		it('does not corrupt data through cache', async () => {
			const original = new ArrayBuffer(10);
			const view = new Uint8Array(original);
			for (let i = 0; i < 10; i++) {
				view[i] = i;
			}

			await mapStateManager.setTile(7, 0, 0, original);
			const retrieved = await mapStateManager.getTile(7, 0, 0);
			const retrievedView = new Uint8Array(retrieved);

			for (let i = 0; i < 10; i++) {
				expect(retrievedView[i]).toBe(i);
			}
		});
	});

	describe('Integration Scenarios', () => {
		it('typical map zoom workflow: pan tiles then zoom', async () => {
			await mapStateManager.initCache(50);

			// Load zoom 7 tiles
			const tile7_1 = new ArrayBuffer(100);
			const tile7_2 = new ArrayBuffer(100);
			await mapStateManager.setTile(7, 64, 42, tile7_1);
			await mapStateManager.setTile(7, 65, 43, tile7_2);

			// Load zoom 8 tiles
			const tile8_1 = new ArrayBuffer(100);
			const tile8_2 = new ArrayBuffer(100);
			await mapStateManager.setTile(8, 128, 84, tile8_1);
			await mapStateManager.setTile(8, 129, 85, tile8_2);

			// Verify all present
			expect(await mapStateManager.getTile(7, 64, 42)).toBe(tile7_1);
			expect(await mapStateManager.getTile(8, 128, 84)).toBe(tile8_1);

			const stats = await mapStateManager.getCacheStats();
			expect(stats.size).toBe(4);
		});

		it('continuous tile requests with eviction', async () => {
			await mapStateManager.initCache(3);
			const tiles = [];

			// Request 5 tiles with 3-tile cache
			for (let i = 0; i < 5; i++) {
				const data = new ArrayBuffer(100);
				tiles.push(data);
				await mapStateManager.setTile(7, i, i, data);
			}

			// Only last 3 should remain
			expect(await mapStateManager.getTile(7, 0, 0)).toBeNull();
			expect(await mapStateManager.getTile(7, 1, 1)).toBeNull();
			expect(await mapStateManager.getTile(7, 2, 2)).toBe(tiles[2]);
			expect(await mapStateManager.getTile(7, 3, 3)).toBe(tiles[3]);
			expect(await mapStateManager.getTile(7, 4, 4)).toBe(tiles[4]);
		});

		it('cache state isolated across test cases via beforeEach', async () => {
			await mapStateManager.initCache(10);
			await mapStateManager.setTile(7, 0, 0, new ArrayBuffer(100));

			// Simulate test case boundary
			await mapStateManager.clearCache();
			mapStateManager.clearMap();

			// New "test case"
			expect(mapStateManager.hasCache()).toBe(false);
			expect(mapStateManager.hasMap()).toBe(false);
		});
	});
});
