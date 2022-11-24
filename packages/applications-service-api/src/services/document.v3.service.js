const { Op, fn, col, literal } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const fetchDocuments = async (filters) => {
	const offset = (filters.page - 1) * config.itemsPerPage;

	const where = {
		[Op.and]: [{ case_reference: filters.caseReference }]
	};

	const query = {
		where,
		order: [['date_published', 'DESC']],
		offset,
		limit: config.itemsPerPage
	};

	const queryResult = await db.Document.findAndCountAll(query);

	return {
		count: queryResult.count,
		rows: queryResult.rows.map(row => row.dataValues)
	}
};

const getAvailableFilters = async (filters) => {
	let query = {
		attributes: [
			[fn('DISTINCT', col('Stage')), 'stage'],
			'filter_1',
			'category',
			[fn('COUNT', col('id')), 'count']
		],
		where: {
			[Op.and]: [
				{ case_reference: filters.caseReference },
				{ Stage: { [Op.ne]: null } },
				{ filter_1: { [Op.ne]: null } }
			]
		},
		group: [literal('stage, filter_1, category')]
	};

	const queryResult = await db.Document.findAll(query)

	return queryResult.map((row) => {
		const category = row.dataValues.category;
		return {
			...row.dataValues,
			category: category === 'NULL' || category === '' ? null : category
		};
	});
};

module.exports = {
	fetchDocuments,
	getAvailableFilters
};
