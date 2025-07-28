/**
 * @jest-environment jsdom
 */

const mockUnregister = jest.fn();
const mockNavigate = jest.fn();
Object.defineProperty(global.navigator, 'serviceWorker', {
	value: {
		getRegistrations: () => [
			{
				unregister: mockUnregister
			}
		]
	}
});
Object.defineProperty(global, 'clients', {
	value: {
		matchAll: () => [
			{
				url: '/example',
				navigate: mockNavigate
			}
		]
	}
});

describe('scripts/unregister-service-worker', () => {
	it('unregisters the service worker', async () => {
		require('../../../src/public/scripts/unregister-service-worker.script.js');
		await delay(100); // Give async code time to run

		expect(mockUnregister).toHaveBeenCalled();
		expect(mockNavigate).toHaveBeenCalledWith('/example');
	});
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
