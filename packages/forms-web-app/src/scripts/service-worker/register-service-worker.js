const { unregisterDuplicateServiceWorker } = require('./unregister-duplicate-service-worker');

(async function () {
	try {
		await unregisterDuplicateServiceWorker();
		await navigator.serviceWorker.register('/public/scripts/service-worker.script.js');
	} catch (error) {
		console.error(`SW Registration failed with ${error}`);
	}
})();
