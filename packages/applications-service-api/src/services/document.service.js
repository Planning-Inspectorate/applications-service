const { Op } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

/**
 * Adds the required Stage clause to the WHERE statement object based on the classification of documents required
 * @param where WHERE statement to be updated.  Must already contain a associate key of Op.and at the root level
 * with an array as it's value so that the necessary Stage clause can be addded on
 * @param classification the classification of documents requested - these map to a set of document stages
 */
const addStageClause = (where, classification) => {
	if (classification === 'all') {
		// Include all stages except zero which is reserved for registration comment attachments
		where[Op.and].push({
			Stage: { [Op.gt]: 0 }
		});
	} else if (classification === 'application') {
		where[Op.and].push({
			Stage: [1, 2, 3]
		});
	} else if (classification === 'examination') {
		where[Op.and].push({
			Stage: 4
		});
	} else if (classification === 'finalisation') {
		where[Op.and].push({
			Stage: [5, 6, 7]
		});
	}
};

const getOrderedDocuments = async (
	caseRef,
	classification,
	pageNo,
	searchTerm,
	stage,
	typeFilters,
	categoryFilters
) => {
	const { itemsPerPage: limit } = config;
	const offset = (pageNo - 1) * limit;

	const where = { [Op.and]: [{ case_reference: caseRef }], [Op.or]: [] };
	const categoryFiltersWhereClause = {
		[Op.and]: [{ case_reference: caseRef }]
	};
	const filters = { categoryFilters: [], typeFilters: [] };
	const categoryItems = [];
	const filterOneItems = [];

	addStageClause(where, classification);

	if (searchTerm) {
		const orOptions = [
			{
				description: {
					[Op.like]: `%${searchTerm}%`
				}
			},
			{
				personal_name: {
					[Op.like]: `%${searchTerm}%`
				}
			},
			{
				representative: {
					[Op.like]: `%${searchTerm}%`
				}
			},
			{
				mime: {
					[Op.like]: `%${searchTerm}%`
				}
			}
		];

		where[Op.and].push({
			[Op.or]: orOptions
		});
	}

	if (stage) {
		where[Op.and].push({
			Stage: { [Op.in]: stage }
		});
		categoryFiltersWhereClause[Op.and].push({
			Stage: { [Op.in]: stage }
		});
	}

	if (categoryFilters && categoryFilters.length > 0) {
		categoryFilters.forEach((categoryFilter) => {
			filters['categoryFilters'].push({
				category: categoryFilter
			});
		});
	}

	if (typeFilters && typeFilters.length > 0) {
		typeFilters.forEach((typeFilter) => {
			filters['typeFilters'].push({
				filter_1: typeFilter
			});
		});
	}

	const queryItems = async (where, options) => {
		let defaultQueryOptions = {
			where,
			offset,
			order: [['date_published', 'DESC']],
			limit
		};

		if (options && typeof options === 'object' && !Array.isArray(options)) {
			defaultQueryOptions = { ...defaultQueryOptions, ...options };
		}

		try {
			const typeItemsResult = await db.Document.findAndCountAll(defaultQueryOptions);

			const data = await typeItemsResult;

			return data;
		} catch (e) {
			console.error(e);
		}
	};

	if (filters.typeFilters.length === 0 && filters.categoryFilters.length === 0) {
		delete where[Op.or];
		const resultData = await queryItems(where);

		resultData && filterOneItems.push(resultData);
	}

	if (filters.typeFilters.length === 0 && filters.categoryFilters.length > 0) {
		categoryFiltersWhereClause[Op.and].push({
			[Op.or]: filters.categoryFilters
		});

		const resultData = await queryItems(categoryFiltersWhereClause);

		resultData && categoryItems.push(resultData);
	}

	if (filters.categoryFilters.length === 0 && filters.typeFilters.length > 0) {
		delete where[Op.or];

		where[Op.and].push({ [Op.or]: filters.typeFilters });

		const resultData = await queryItems(where);

		resultData && filterOneItems.push(resultData);
	}

	if (filters.categoryFilters.length > 0 && filters.typeFilters.length > 0) {
		where[Op.or].push({ [Op.or]: filters.typeFilters });
		where[Op.or].push({ [Op.or]: filters.categoryFilters });

		const resultData = await queryItems(where, {
			attributes: [
				[db.sequelize.fn('DISTINCT', db.sequelize.col('id')), 'id'],
				'filter_1',
				'category',
				'date_published'
			]
		});

		resultData && categoryItems.push(resultData);
	}

	const documents = {
		count: 0,
		rows: []
	};

	categoryItems.forEach(({ count, rows }) => {
		if (!count || !rows) {
			return;
		}
		documents.count += count ?? 0;
		documents.rows = rows ? documents.rows.concat(rows) : documents.rows;
	});

	filterOneItems.forEach(({ count, rows }) => {
		if (!count || !rows) {
			return;
		}

		documents.count += count ?? 0;
		documents.rows = rows ? documents.rows.concat(rows) : documents.rows;
	});

	return documents;
};

const getFilters = async (filter, caseRef, classification) => {
	const where = { [Op.and]: [{ case_reference: caseRef }] };
	addStageClause(where, classification);

	let order = [];

	if (filter === 'Stage') {
		order = [['Stage']];
	}

	if (filter === 'filter_1') {
		order = [db.sequelize.literal('count DESC')];
	}

	if (filter === 'category') {
		order = [db.sequelize.literal('count DESC')];
		where[Op.and].push({
			category: {
				[Op.and]: [{ [Op.ne]: null }, { [Op.notIn]: ['', 'NULL'] }]
			}
		});
	}

	const filters = await db.Document.findAll({
		where,
		order,
		attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
		group: [filter]
	});

	return filters;
};

const getDocumentsByDataId = async (dataIDs) => {
	const documents = await db.Document.findAll({
		where: {
			dataID: { [Op.in]: dataIDs }
		}
	});
	return documents;
};

module.exports = {
	getOrderedDocuments,
	getFilters,
	getDocumentsByDataId
};
