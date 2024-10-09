(async function () {
	try {
		await navigator.serviceWorker.register('/public/scripts/service-worker.script.js');
	} catch (error) {
		console.error(`SW Registration failed with ${error}`);
	}
})();
