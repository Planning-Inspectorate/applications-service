const { Op, fn, col, literal } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const fetchDocuments = async (requestQuery) => {
	const offset = (requestQuery.page - 1) * config.itemsPerPage;

	const where = buildWhereClause(requestQuery);

	const dbQuery = {
		where,
		order: [['date_published', 'DESC']],
		offset,
		limit: config.itemsPerPage
	};

	const queryResult = await db.Document.findAndCountAll(dbQuery);

	return {
		count: queryResult.count,
		rows: queryResult.rows.map((row) => row.dataValues)
	};
};

const getAvailableFilters = async (caseReference) => {
	let query = {
		attributes: [
			[fn('DISTINCT', col('stage')), 'stage'],
			'filter_1',
			'category',
			[fn('COUNT', col('id')), 'count']
		],
		where: {
			[Op.and]: [
				{ case_reference: caseReference },
				{ stage: { [Op.ne]: null } },
				{ filter_1: { [Op.ne]: null } }
			]
		},
		group: [literal('stage, filter_1, category')]
	};

	const queryResult = await db.Document.findAll(query);

	return queryResult.map((row) => {
		const category = row.dataValues.category;
		return {
			...row.dataValues,
			category: category === 'NULL' || category === '' ? null : category
		};
	});
};

const buildWhereClause = (requestQuery) => {
	let statements = [{ case_reference: requestQuery.caseReference }];

	const searchTermStatement = mapSearchTermToQuery(requestQuery.searchTerm);
	const filtersStatements = mapFiltersToQuery(requestQuery.filters);

	if (searchTermStatement) statements.push(searchTermStatement);
	if (filtersStatements) statements.push(filtersStatements);

	return {
		[Op.and]: statements
	};
};

const mapFiltersToQuery = (filters) => {
	if (filters) {
		const filtersQuery = filters.map((filter) => {
			let filterStatement = { [filter.name]: filter.value };
			if (filter.type) filterStatement['filter_1'] = filter.type.map((type) => type.value);
			return filterStatement;
		});
		if (filtersQuery.length > 0) return { [Op.or]: filtersQuery };
	}
};

const mapSearchTermToQuery = (searchTerm) => {
	if (searchTerm) {
		const searchStatements = ['description', 'personal_name', 'representative', 'mime'].map(
			(field) => ({
				[field]: { [Op.like]: `%${searchTerm}%` }
			})
		);
		return { [Op.or]: searchStatements };
	}
};

module.exports = {
	fetchDocuments,
	getAvailableFilters
};
