function buildQueryString(query) {
	const URL = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (Array.isArray(value)) {
			value.forEach((item) => {
				URL.append(key, item);
			});
		} else {
			URL.append(key, value);
		}
	}

	return `?${URL.toString()}`;
}

module.exports = {
	buildQueryString
};
