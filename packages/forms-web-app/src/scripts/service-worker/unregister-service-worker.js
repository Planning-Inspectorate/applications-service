(async function () {
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for (let registration of registrations) {
			await registration.unregister();
		}
	} catch (error) {
		console.error(`SW Unregistration failed with ${error}`);
	}
})();
