const db = require('../models');
const { pick } = require('lodash');
const { Op } = require('sequelize');

const getRepresentationById = async (ID) => {
	return db.Representation.findOne({ where: { ID }, raw: true });
};
const getRepresentationsWithCount = async (options = {}) => {
	let findOptions = pick(options, ['offset', 'limit', 'order']);
	findOptions.raw = true;
	findOptions.where = { [Op.and]: [{ CaseReference: options.applicationId }] };

	// types
	let types = [];
	if (options.type) {
		types = options.type instanceof Array ? [...options.type] : options.type.split(',');

		if (types.length > 0) {
			findOptions.where[Op.and].push({
				RepFrom: { [Op.in]: types }
			});
		}
	}

	// search term
	if (options.searchTerm) {
		const orOptions = [
			{ PersonalName: { [Op.like]: `%${options.searchTerm}%` } },
			{ RepresentationRedacted: { [Op.like]: `%${options.searchTerm}%` } },
			{ Representative: { [Op.like]: `%${options.searchTerm}%` } }
		];

		findOptions.where[Op.and].push({
			[Op.or]: orOptions
		});
	}

	const { rows, count } = await db.Representation.findAndCountAll(findOptions);

	return { count, representations: rows };
};

const getRepresentations = async (options = {}) => {
	return db.Representation.findAll({ ...options, raw: true });
};

module.exports = {
	getRepresentationsWithCount,
	getRepresentations,
	getRepresentationById
};
