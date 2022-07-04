/* eslint-disable no-unused-vars */

const initScripts = (config) => {
	if (!config || !Array.isArray(config)) return;

	config.forEach((settings) => {
		const {
			async = true,
			defer = true,
			callback = () => {},
			src = null,
			type = 'text/javascript'
		} = settings;

		if (!src) return;

		const script = document.createElement('script');
		script.async = async;
		script.defer = defer;
		script.src = src;
		script.type = type;
		script.onload = () => {
			callback();
		};

		document.body.appendChild(script);
	});
};
