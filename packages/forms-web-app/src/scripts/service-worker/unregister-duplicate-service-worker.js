const unregisterDuplicateServiceWorker = async () => {
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();

		for (let registration of registrations) {
			if (registration.active.scriptURL.includes('sw.script.js')) {
				await registration.unregister();
			}
		}
	} catch (error) {
		console.error(`Unregistration of duplicate service worker failed with ${error}`);
	}
};

module.exports = {
	unregisterDuplicateServiceWorker
};
