(async function () {
	try {
		await navigator.serviceWorker.register('/sw.js');
	} catch (error) {
		console.error(`SW Registration failed with ${error}`);
	}
})();
