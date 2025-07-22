const db = require('../models');
const { pick } = require('lodash');
const { Op } = require('sequelize');
const stopWords = require('../utils/stopwords');
const stopWordList = stopWords.english;

const getRepresentationByIdAndCaseRef = async (ID, caseReference) => {
	return db.Representation.findOne({ where: { ID, CaseReference: caseReference }, raw: true });
};
const getRepresentationsWithCount = async (options = {}) => {
	let findOptions = pick(options, ['offset', 'limit']);
	findOptions.order = [['DateRrepReceived', 'desc'], ['PersonalName']];
	findOptions.raw = true;
	findOptions.where = { [Op.and]: [{ CaseReference: options.caseReference }] };

	let types = [];
	if (options.type) {
		types = options.type instanceof Array ? [...options.type] : options.type.split(',');

		if (types.length > 0) {
			findOptions.where[Op.and].push({
				RepFrom: { [Op.in]: types }
			});
		}
	}

	if (options.searchTerm) {
		const terms = options.searchTerm
			.split(' ')
			.filter((term) => !stopWordList.includes(term.toLowerCase()));
		// Ensure that each search term is found in at least one of the three fields
		terms.forEach((term) => {
			findOptions.where[Op.and].push({
				[Op.or]: [
					{ PersonalName: { [Op.like]: `%${term}%` } },
					{ Representative: { [Op.like]: `%${term}%` } },
					{ RepresentationRedacted: { [Op.like]: `%${term}%` } }
				]
			});
		});
	}

	const { rows, count } = await db.Representation.findAndCountAll(findOptions);

	return { count, representations: rows };
};

const getRepresentations = async (options = {}) => {
	return db.Representation.findAll({ ...options, raw: true });
};

const getFilters = async (filter, caseReference) => {
	const filters = await getRepresentations({
		where: { CaseReference: caseReference, RepFrom: { [Op.ne]: null } },
		attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
		group: [filter]
	});
	return filters.map((filter) => ({
		name: filter.RepFrom,
		count: filter.count
	}));
};
module.exports = {
	getRepresentationsWithCount,
	getRepresentations,
	getRepresentationByIdAndCaseRef,
	getFilters
};
