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

const getOrderedDocuments = async (caseRef, classification, pageNo, searchTerm, stage, typeFilters, categoryFilters) => {
	const { itemsPerPage: limit } = config;
	const offset = (pageNo - 1) * limit;

	const where = { [Op.and]: [{ case_reference: caseRef }] };

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
	}

	let filters = [];
	if (categoryFilters && categoryFilters.length > 0) {
		categoryFilters.forEach((categoryFilter) => {
			filters.push({
				category: categoryFilter
			});
		});
	}
	if (typeFilters && typeFilters.length > 0) {
		typeFilters.forEach((typeFilter) => {
			filters.push({
				type: typeFilter
			});
		});
	}

	if (filters.length > 0) {
		where[Op.and].push({[Op.or]: filters});
	}

	const documents = await db.Document.findAndCountAll({
		where,
		offset,
		order: [['date_published', 'DESC']],
		limit
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
				[Op.and]: [
					{[Op.ne]: null},
					{[Op.notIn]: ['', 'NULL']}
				]
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
