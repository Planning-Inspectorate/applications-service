function initiate() {
	this.scripts = function (config, cspNonce) {
		if (!Array.isArray(config)) return;

		const configModified = config.map((configItem) => {
			if (!configItem || typeof configItem !== 'object') return null;

			if (configItem.callback && typeof configItem.callback === 'string') {
				configItem.callback = new Function(configItem.callback);
			}

			return configItem;
		});

		configModified.forEach((settings) => {
			if (!settings || typeof settings !== 'object') return;

			const {
				nonce = cspNonce,
				async = false,
				callback = null,
				id = null,
				src = null,
				type = 'text/javascript'
			} = settings;

			if (!src) return;

			const script = document.createElement('script');
			if (async) script.setAttribute('async', true);
			else script.setAttribute('defer', true);
			if (callback && typeof callback === 'function') script.onload = () => callback();
			if (id) script.id = id;
			script.src = src;
			script.type = type;
			script.nonce = nonce;

			document.body.appendChild(script);
		});
	};
}

module.exports = initiate;
