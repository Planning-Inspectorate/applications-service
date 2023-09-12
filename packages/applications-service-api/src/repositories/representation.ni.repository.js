const db = require('../models');
const { pick } = require('lodash');
const { Op } = require('sequelize');
const getRepresentations = async (options) => {
	let findOptions = pick(options, ['offset', 'limit', 'order']);
	findOptions.where = {};

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
			{ OrganisationName: { [Op.like]: `%${options.searchTerm}%` } },
			{ RepFrom: { [Op.like]: `%${options.searchTerm}%` } }
		];

		findOptions.where[Op.and].push({
			[Op.or]: orOptions
		});
	}

	const { rows, count } = await db.Representation.findAndCountAll(findOptions);
	return { count, representations: rows };
};

const getRepresentationById = async (ID) => {
	return db.Representation.findOne({ where: { ID } });
};

module.exports = {
	getRepresentations,
	getRepresentationById
};
