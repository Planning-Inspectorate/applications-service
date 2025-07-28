const { Op, fn, col, literal } = require('sequelize');
const db = require('../models');
const stopWords = require('../utils/stopwords');
const stopWordList = stopWords.english;

const fetchDocuments = async (requestQuery) => {
	const where = {
		[Op.and]: buildWhereStatements(
			requestQuery.caseReference,
			requestQuery.searchTerm,
			requestQuery.filters,
			{ from: requestQuery.datePublishedFrom, to: requestQuery.datePublishedTo }
		)
	};

	const dbQuery = {
		where,
		order: [['date_published', 'DESC'], ['id']],
		offset: (requestQuery.page - 1) * requestQuery.itemsPerPage || 0,
		limit: requestQuery.itemsPerPage
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
			['filter_1', 'filter1'],
			'category',
			[fn('COUNT', col('id')), 'total']
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

const buildWhereStatements = (caseReference, searchTerm, filters, datePublished) => {
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

	if (datePublished) {
		const datePublishedStatements = buildDateQuery(datePublished);
		if (datePublishedStatements) statements.push(datePublishedStatements);
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
		const terms = searchTerm
			.split(' ')
			.filter((term) => !stopWordList.includes(term.toLowerCase()));

		const searchStatements = ['description', 'personal_name', 'representative', 'mime'].map(
			(field) => ({
				[Op.and]: terms.map((term) => ({ [field]: { [Op.like]: `%${term}%` } }))
			})
		);

		return { [Op.or]: searchStatements };
	}
};

const buildDateQuery = ({ from, to } = {}) => {
	if (from && to) {
		return { ['date_published']: { [Op.between]: [from, to] } };
	}

	if (to) {
		return { ['date_published']: { [Op.lte]: to } };
	}

	if (from) {
		return { ['date_published']: { [Op.gte]: from } };
	}
};

const getDocumentsByDataId = (dataIds) => {
	if (!dataIds || dataIds.length === 0) return [];
	return db.Document.findAll({
		where: {
			dataID: { [Op.in]: dataIds }
		},
		raw: true
	});
};

const fetchDocumentsByDocumentType = async (requestQuery) => {
	const where = {
		case_reference: requestQuery.caseReference,
		type: requestQuery.type
	};

	const dbQuery = {
		where,
		order: [['date_created', 'desc']]
	};

	return await db.Document.findOne(dbQuery);
};

module.exports = {
	fetchDocuments,
	getAvailableFilters,
	getDocumentsByDataId,
	fetchDocumentsByDocumentType
};
