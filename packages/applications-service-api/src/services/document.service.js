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

const getDocuments = async (caseRef, pageNo, searchTerm) => {
	const { itemsPerPage: limit } = config;
	const offset = (pageNo - 1) * limit;

	// SELECT * FROM ipclive.wp_ipc_documents_api where case_reference like 'caseRef' AND Stage IN (1, 2, 3)
	// AND (desc like %searchTerm% OR path like %searchTerm% OR filter_1 like %searchTerm% or filter_2 like %searchTerm%)
	// AND filter[0] AND filter[1] ... AND filter[n];

	let where = {
		case_reference: caseRef,
		Stage: { [Op.in]: [1, 2, 3] }
	};

	if (searchTerm) {
		where = {
			[Op.and]: [
				{
					case_reference: caseRef,
					Stage: { [Op.in]: [1, 2, 3] }
				}
			]
		};
		where[Op.and].push({
			[Op.or]: [
				{
					description: {
						[Op.like]: `%${searchTerm}%`
					}
				},
				{
					path: {
						[Op.like]: `%${searchTerm}%`
					}
				},
				{
					filter_1: {
						[Op.like]: `%${searchTerm}%`
					}
				},
				{
					filter_2: {
						[Op.like]: `%${searchTerm}%`
					}
				},
				{
					category: {
						[Op.like]: `%${searchTerm}%`
					}
				}
			]
		});
	}
	const documents = await db.Document.findAndCountAll({
		where,
		offset,
		limit
	});

	return documents;
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

	const where = { [Op.and]: [{ case_reference: caseRef }] };
	const categoryFiltersWhereClause = {
		[Op.and]: [
			{
				Stage: { [Op.in]: [1, 2, 3] }
			},
			{ case_reference: caseRef }
		]
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
				type: typeFilter
			});
		});
	}

	if (filters.typeFilters.length === 0 && filters.categoryFilters.length === 0) {
		const getTypeItems = async () => {
			try {
				const typeItemsResult = await db.Document.findAndCountAll({
					where,
					offset,
					order: [['date_published', 'DESC']],
					limit
				});

				const data = await typeItemsResult;

				return data;
			} catch (e) {
				console.error(e);
			}
		};

		const resultData = await getTypeItems();

		resultData && filterOneItems.push(resultData);
	}

	if (filters.typeFilters.length === 0 || filters.categoryFilters.length > 0) {
		categoryFiltersWhereClause[Op.and].push({
			[Op.or]: filters.categoryFilters
		});

		const getCategoryItems = async () => {
			try {
				const categoryItemsResult = await db.Document.findAndCountAll({
					where: categoryFiltersWhereClause,
					offset,
					order: [['date_published', 'DESC']],
					limit
				});

				const data = await categoryItemsResult;

				return data;
			} catch (e) {
				console.error(e);
			}
		};

		const resultData = await getCategoryItems();

		resultData && categoryItems.push(resultData);
	}

	if (filters.typeFilters.length > 0) {
		where[Op.and].push({ [Op.or]: filters.typeFilters });

		const getTypeItems = async () => {
			try {
				const typeItemsResult = await db.Document.findAndCountAll({
					where,
					offset,
					order: [['date_published', 'DESC']],
					limit
				});

				const data = await typeItemsResult;

				return data;
			} catch (e) {
				console.error(e);
			}
		};

		const resultData = await getTypeItems();

		resultData && filterOneItems.push(resultData);
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
	getDocuments,
	getOrderedDocuments,
	getFilters,
	getDocumentsByDataId
};
