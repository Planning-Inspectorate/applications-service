const R = require('ramda');
const logger = require('../lib/logger');
const config = require('../lib/config');

const { getOrderedDocuments, getDocuments, getFilters } = require('../services/document.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getDocuments(req, res) {
		const { caseRef } = req.params;
		const { pageNo = 1, searchTerm = null, filters = null } = req.body;

		logger.debug(`Retrieving documents by case reference ${caseRef} ...`);
		try {
			const documents = await getDocuments(caseRef, pageNo, searchTerm, filters);

			if (!documents.rows.length) {
				throw ApiError.noDocumentsFound();
			}

			const { itemsPerPage, documentsHost } = config;
			const totalItems = documents.count;
			const byType = R.groupBy(R.prop('type'));
			const byStage = R.groupBy(R.prop('Stage'));
			const rows = documents.rows.map((row) => ({
				...row.dataValues,
				path: row.dataValues.path ? `${documentsHost}${row.dataValues.path}` : null
			}));

			const wrapper = {
				documents: Object.entries(byStage(rows)).map((e) => ({ [e[0]]: byType(e[1]) })),
				totalItems,
				itemsPerPage,
				totalPages: Math.ceil(totalItems / itemsPerPage),
				currentPage: pageNo
			};

			logger.debug(`Documents for project ${caseRef} retrieved`);
			res.status(200).send(wrapper);
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
				return;
			}
			logger.error(e.message);
			res.status(500).send(`Problem getting documents for project ${caseRef} \n ${e}`);
		}
	},

	async getV2Documents(req, res) {
		const { caseRef, page = 1, searchTerm, stage, classification, type, category } = req.query;

		if (!caseRef) {
			throw ApiError.badRequest('Required query parameter caseRef missing');
		}

		const stageFiltersAvailable = await getFilters('Stage', caseRef, classification);
		const typeFiltersAvailable = await getFilters('filter_1', caseRef, classification);
		const categoryFiltersAvailable = await getFilters('category', caseRef, classification);

		let typeFilters = [];
		if (type) {
			typeFilters = type instanceof Array ? [...type] : type.split(',');

			// const numberOfFiltersToDisplay = 5;
			// everything else
		}

		let categoryFilters = [];
		if (category) {
			categoryFilters = category instanceof Array ? [...category] : category.split(',');
		}

		try {
			const documents = await getOrderedDocuments(
				caseRef,
				classification,
				page,
				searchTerm,
				stage && !(stage instanceof Array) ? [stage] : stage,
				typeFilters,
				categoryFilters
			);

			const { itemsPerPage, documentsHost } = config;
			const totalItems = documents.count;
			const rows = documents.rows.map((row) => ({
				...row.dataValues,
				path: row.dataValues.path ? `${documentsHost}${row.dataValues.path}` : null
			}));

			const wrapper = {
				documents: rows,
				totalItems,
				itemsPerPage,
				totalPages: Math.ceil(Math.max(1, totalItems) / itemsPerPage),
				currentPage: page,
				filters: {
					stageFilters: stageFiltersAvailable
						? stageFiltersAvailable
								.map((f) => ({
									name: f.dataValues.Stage ?? '',
									count: f.dataValues.count ?? 0
								}))
								.filter(({ name, count }) => name && count)
						: [],
					typeFilters: typeFiltersAvailable
						? typeFiltersAvailable
								.map((f) => ({
									name: f.dataValues.filter_1 ?? '',
									count: f.dataValues.count ?? 0
								}))
								.filter(({ name, count }) => name && count)
						: [],
					categoryFilters: categoryFiltersAvailable ?
						categoryFiltersAvailable.map((f) => ({
							name: f.dataValues.category ?? '',
							count: f.dataValues.count ?? 0
						})).filter(({ name, count }) => name && count)
						: []
				}
			};

			logger.debug(`Documents for project ${caseRef} retrieved`);
			res.status(200).send(wrapper);
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				console.error(e);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
			}
			console.error(e);
			logger.error(e.message);
			res.status(500).send(`Problem getting documents for project ${caseRef} \n ${e}`);
		}
	}
};
