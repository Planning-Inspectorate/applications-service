(async function () {
	try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for(let registration of registrations) {
			await registration.unregister();
			const clients = await clients.matchAll();

			clients.forEach(client => {
				if (client.url && "navigate" in client){
					client.navigate(client.url);
				}
			});
		}
	} catch (error) {
		console.error(`SW Unregistration failed with ${error}`);
	}
})();
