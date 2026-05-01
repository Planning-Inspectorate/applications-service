const index = require('./index');
const notifyBuilder = require('./notify-builder');
const createNotifyClient = require('./notify-factory');

describe('index', () => {
	it('should export the expected modules', () => {
		expect(index).toEqual({
			notifyBuilder,
			createNotifyClient
		});
	});
});
