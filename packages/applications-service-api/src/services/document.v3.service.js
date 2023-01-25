const { Op, fn, col, literal } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const fetchDocuments = async (requestQuery) => {
	const offset = (requestQuery.page - 1) * config.itemsPerPage;

	const where = {
		[Op.and]: buildWhereStatements(
			requestQuery.caseReference,
			requestQuery.searchTerm,
			requestQuery.filters
		)
	};

	const dbQuery = {
		where,
		order: [['date_published', 'DESC'], ['id']],
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
	const where = {
		[Op.and]: buildWhereStatements(caseReference).concat([{ filter_1: { [Op.ne]: null } }])
	};

	const query = {
		attributes: [
			[fn('DISTINCT', col('stage')), 'stage'],
			'filter_1',
			'category',
			[fn('COUNT', col('id')), 'count']
		],
		where,
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

const buildWhereStatements = (caseReference, searchTerm, filters) => {
	const statements = [
		{ case_reference: caseReference },
		{ stage: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: 0 }] } }
	];

	if (searchTerm) {
		const searchTermStatement = mapSearchTermToQuery(searchTerm);
		if (searchTermStatement) statements.push(searchTermStatement);
	}

	if (filters) {
		const filtersStatements = mapFiltersToQuery(filters);
		if (filtersStatements) statements.push(filtersStatements);
	}

	return statements;
};

const mapFiltersToQuery = (filters) => {
	if (filters) {
		const filtersQuery = filters.map((filter) => {
			let filterStatement = { [filter.name]: filter.value };
			if (filter.type && filter.type.length > 0)
				filterStatement['filter_1'] = filter.type.map((type) => type.value);
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
