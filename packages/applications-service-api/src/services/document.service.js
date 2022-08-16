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

	let where = { case_reference: caseRef, Stage: { [Op.in]: [1, 2, 3] } };
	if (searchTerm) {
		where = { [Op.and]: [{ case_reference: caseRef, Stage: { [Op.in]: [1, 2, 3] } }] };
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

const getOrderedDocuments = async (caseRef, classification, pageNo, searchTerm, stage, type) => {
	console.log({ typos: type });
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

	if (type && type.length > 1) {
		const typesWithoutApplicationDocument = [];
		let foundApplicationDocument = false;

		for (const typeName of type) {
			if (typeName === "Developer's Application") {
				foundApplicationDocument = true;
			}

			if (typeName !== "Developer's Application") {
				typesWithoutApplicationDocument.push(typeName);
			}
		}

		where[Op.and].push({
			filter_1: typesWithoutApplicationDocument
		});

		// if (foundApplicationDocument && typesWithoutApplicationDocument.length === 0) {
		// 	const [results, metadata] = await db.sequelize.query(
		// 		"SELECT `category`, COUNT(`category`) AS `count` FROM `wp_ipc_documents_api` AS `Document` WHERE (`Document`.`case_reference` = 'EN010085' AND `Document`.`Stage` IN (1, 2, 3)) GROUP BY `category` ORDER BY count DESC"
		// 	);

		// 	console.log({ metadata, results: results.length });

		// 	const [results2, metadata2] = await db.sequelize.query(
		// 		"SELECT `id`, `dataID`, `case_reference`, `Stage`, `type`, `filter_1`, `filter_2`, `category`, `description`, `size`, `mime`, `path`, `status`, `date_published`, `deadline_date`, `personal_name`, `representative`, `who_from`, `doc_reference`, `author`, `details`, `last_modified`, `date_created` FROM `wp_ipc_documents_api` AS `Document` WHERE (`Document`.`case_reference` = 'EN010085' AND `Document`.`Stage` IN (1, 2, 3)) ORDER BY `Document`.`date_published` DESC LIMIT 0, 20"
		// 	);

		// 	console.log({ metadata2, results2: results2.length });

		// 	console.warn('foundApplicationDocument && typesWithoutApplicationDocument.length === 0', {
		// 		typesWithoutApplicationDocument
		// 	});

		// 	where[Op.and].push({
		// 		category: { [Op.like]: `%Developer's Application%` }
		// 	});
		// }

		// if (!foundApplicationDocument && typesWithoutApplicationDocument.length > 0) {
		// 	console.warn('!foundApplicationDocument && typesWithoutApplicationDocument.length > 0', {
		// 		type
		// 	});

		// 	where[Op.and].push({
		// 		filter_1: typesWithoutApplicationDocument
		// 	});
		// }

		// if (foundApplicationDocument && typesWithoutApplicationDocument.length > 0) {
		// 	console.warn('foundApplicationDocument && typesWithoutApplicationDocument.length > 0', {
		// 		type
		// 	});

		// 	where[Op.and].push({
		// 		filter_1: typesWithoutApplicationDocument,
		// 		category: { [Op.like]: `%Developer's Application%` }
		// 	});
		// }

		// if (singleItemAndApplicationDocument) {
		// 	console.warn('singleItemAndApplicationDocument', { type });
		// 	where[Op.and].push({
		// 		[Op.or]: [
		// 			{
		// 				filter_1: { [Op.like]: `%${typesWithoutApplicationDocument}%` }
		// 			},
		// 			{
		// 				category: { [Op.like]: `%Developer's Application%` }
		// 			}
		// 		]
		// 	});
		// }
	}

	const [...getArr] = where[Op.and];
	getArr.forEach((obj) => {
		Object.entries(obj).forEach(([key, value]) =>
			console.warn('Logging filter object', { key: JSON.parse(JSON.stringify(value)) })
		);
	});

	console.warn({ theFilterIs: where[Op.and] });

	const documents = await db.Document.findAndCountAll({
		where,
		offset,
		order: [['date_published', 'DESC']],
		limit
	});

	const x = Object.entries(documents)
		.filter((r, i) => i < 5)
		.map((rows) => rows[1][1]);

	console.log({ documentResult: JSON.parse(JSON.stringify(x)) });

	// const [results, metadata] = await db.sequelize.query(
	// 	"SELECT `category`, COUNT(`category`) AS `count` FROM `wp_ipc_documents_api` AS `Document` WHERE (`Document`.`case_reference` = 'EN010085' AND `Document`.`Stage` IN (1, 2, 3)) GROUP BY `category` ORDER BY count DESC"
	// );

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
