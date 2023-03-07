function initiate() {
	this.scripts = function (config, nonce) {
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

			const { async = false, callback = null, id = null, src = null } = settings;

			if (!src) return;

			const script = document.createElement('script');
			if (async) script.setAttribute('async', '');
			else script.setAttribute('defer', '');
			if (callback && typeof callback === 'function') script.onload = () => callback();
			if (id) script.id = id;
			if (nonce) script.nonce = nonce;
			script.src = src;

			document.body.appendChild(script);
		});
	};
}

module.exports = initiate;
