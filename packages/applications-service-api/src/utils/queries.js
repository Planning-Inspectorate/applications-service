const { Op } = require('sequelize');

const mapNISearchTermToQuery = (searchTerm, keys) => {
	if (!searchTerm) return {};
	const terms = searchTerm.split(' ');
	const mappedTerms = terms.map((term) => ({
		[Op.or]: keys.map((key) => ({
			[key]: { [Op.like]: `%${term}%` }
		}))
	}));
	return {
		[Op.or]: mappedTerms
	};
};

const mapBOSearchTermToQuery = (searchTerm, keys) => {
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
	mapNISearchTermToQuery,
	mapBOSearchTermToQuery
};
