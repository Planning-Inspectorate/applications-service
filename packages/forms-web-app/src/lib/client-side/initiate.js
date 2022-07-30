function initiate() {
	this.scripts = function (config = null) {
		console.log('config::: ', config);

		if (!Array.isArray(config)) return;

		const configModified = config.map((configItem) => {
			if (configItem.callback && typeof configItem.callback === 'string') {
				configItem.callback = new Function(configItem.callback);
			}

			return configItem;
		});

		configModified.forEach((settings = {}) => {
			if (!settings && typeof settings !== 'object') return;

			const {
				async = false,
				defer = true,
				callback = null,
				src = null,
				type = 'text/javascript'
			} = settings;

			if (!src) return;

			const script = document.createElement('script');
			if (async) script.async = async;
			else script.defer = defer;
			script.src = src;
			script.type = type;
			if (callback && typeof callback === 'function') script.onload = () => callback();

			document.body.appendChild(script);
		});
	};
}

module.exports = initiate;
