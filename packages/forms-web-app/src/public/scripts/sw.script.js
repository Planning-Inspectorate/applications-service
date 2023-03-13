self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('active', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	matchFormPost(event, handleFormPost);
});

function matchFormPost(event, func) {
	if (event.request.method === 'POST') {
		if (new URL(self.location).origin === new URL(event.request.url).origin) {
			if (event.request.headers.get('content-type') === 'application/x-www-form-urlencoded')
				func(event);
		}
	}
}

function handleFormPost(event) {
	event.respondWith(
		(async () => {
			try {
				const request = event.request.clone();

				const rawFormData = await new Response(request.body).text();
				const formData = Object.fromEntries(new URLSearchParams(rawFormData).entries());

				return fetch(request.url, {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(formData),
					redirect: 'manual'
				});
			} catch (error) {
				console.error(error);
				return fetch(event.request);
			}
		})()
	);
}
