const mapSearchTermToQuery = (searchTerm, keys) => {
	if (!searchTerm) return {};
	const terms = searchTerm.split(' ');
	const mappedTerms = terms.map((term) => ({
		OR: keys.map((key) => ({
			[key]: { contains: term }
		}))
	}));
	return {
		OR: mappedTerms
	};
};

module.exports = {
	mapSearchTermToQuery
};
