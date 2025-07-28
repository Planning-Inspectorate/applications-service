/**
 * @jest-environment jsdom
 */

const mockRegister = jest.fn();
Object.defineProperty(global.navigator, 'serviceWorker', {
	value: {
		register: mockRegister
	}
});

describe('scripts/register-service-worker.script.js', () => {
	it('registers the service worker', async () => {
		require('../../../src/public/scripts/register-service-worker.script.js');
		await delay(100); // Give async code time to run

		expect(mockRegister).toHaveBeenCalledWith('/public/scripts/service-worker.script.js');
	});
});

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
