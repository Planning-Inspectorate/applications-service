/**
 * @jest-environment jsdom
 */
const listeners = {};
const mockAddEventListener = jest.fn().mockImplementation((event, func) => {
	listeners[event] = func;
});
const mockSkipWaiting = jest.fn();
Object.defineProperty(global, 'self', {
	value: {
		addEventListener: mockAddEventListener,
		skipWaiting: mockSkipWaiting,
		clients: {
			claim: () => 'value'
		},
		location: 'http://example.com/example'
	}
});

const mockFetch = jest.fn();
Object.defineProperty(global, 'fetch', {
	value: mockFetch
});

describe('scripts/service-worker.script', () => {
	it('adds event listeners', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		expect(mockAddEventListener).toHaveBeenNthCalledWith(1, 'install', listeners.install);
		expect(mockAddEventListener).toHaveBeenNthCalledWith(2, 'active', listeners.active);
		expect(mockAddEventListener).toHaveBeenNthCalledWith(3, 'fetch', listeners.fetch);
	});

	it('handles install event ', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		listeners.install();
		expect(mockSkipWaiting).toHaveBeenCalled();
	});

	it('handles active event ', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		const mockWaitUntil = jest.fn();
		listeners.active({
			waitUntil: mockWaitUntil
		});
		expect(mockWaitUntil).toHaveBeenCalledWith('value');
	});

	it('intercepts fetch event for form post', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		const mockResponseWith = jest.fn();
		listeners.fetch({
			request: {
				method: 'POST',
				url: 'http://example.com/example',
				headers: {
					get: () => 'application/x-www-form-urlencoded'
				},
				clone: () => ({
					url: 'http://example.com/example',
					formData: jest.fn().mockResolvedValue({
						keys: () => ['first', 'second', 'third', 'third'].values(),
						getAll: (key) => {
							const keyValues = {
								first: 'one',
								second: 'two',
								third: ['three', 'four']
							};

							return keyValues[key];
						}
					})
				})
			},
			respondWith: mockResponseWith
		});
		await delay(100); // Give async code time to run

		expect(mockResponseWith).toBeCalled();
		expect(mockFetch).toBeCalledWith('http://example.com/example', {
			method: 'POST',
			redirect: 'manual',
			headers: {
				'content-type': 'application/json'
			},
			body: '{"first":"one","second":"two","third":["three","four"]}'
		});
	});

	it('does not handle fetch event for non-form post ', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		const mockResponseWith = jest.fn();
		listeners.fetch({
			request: {
				method: 'POST',
				url: 'http://example.com/example',
				headers: {
					get: () => 'application/json'
				},
				clone: () => ({
					url: 'http://example.com/example',
					formData: jest.fn().mockResolvedValue({
						keys: () => ['first', 'second'].values(),
						getAll: (key) => {
							const keyValues = {
								first: 'one',
								second: 'two'
							};

							return keyValues[key];
						}
					})
				})
			},
			respondWith: mockResponseWith
		});
		await delay(100); // Give async code time to run

		expect(mockResponseWith).not.toBeCalled();
		expect(mockFetch).not.toBeCalled();
	});

	it('does not handle fetch event for non-post ', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		const mockResponseWith = jest.fn();
		listeners.fetch({
			request: {
				method: 'GET',
				url: 'http://example.com/example',
				headers: {
					get: () => 'application/x-www-form-urlencoded'
				},
				clone: () => ({
					url: 'http://example.com/example',
					formData: jest.fn().mockResolvedValue({
						keys: () => ['first', 'second'].values(),
						getAll: (key) => {
							const keyValues = {
								first: 'one',
								second: 'two'
							};

							return keyValues[key];
						}
					})
				})
			},
			respondWith: mockResponseWith
		});
		await delay(100); // Give async code time to run

		expect(mockResponseWith).not.toBeCalled();
		expect(mockFetch).not.toBeCalled();
	});

	it('does not handle fetch event for non-same origin ', async () => {
		require('../../../src/public/scripts/service-worker.script.js');
		await delay(100); // Give async code time to run

		const mockResponseWith = jest.fn();
		listeners.fetch({
			request: {
				method: 'POST',
				url: 'http://not.example.com/example',
				headers: {
					get: () => 'application/x-www-form-urlencoded'
				},
				clone: () => ({
					url: 'http://not.example.com/example',
					formData: jest.fn().mockResolvedValue({
						keys: () => ['first', 'second'].values(),
						getAll: (key) => {
							const keyValues = {
								first: 'one',
								second: 'two'
							};

							return keyValues[key];
						}
					})
				})
			},
			respondWith: mockResponseWith
		});
		await delay(100); // Give async code time to run

		expect(mockResponseWith).not.toBeCalled();
		expect(mockFetch).not.toBeCalled();
	});
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
