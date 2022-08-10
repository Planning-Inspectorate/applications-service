const R = require('ramda');
const logger = require('../lib/logger');
const config = require('../lib/config');
const { mapFilters } = require('../utils/map-filters');

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
		const { caseRef, page = 1, searchTerm, stage, classification, type } = req.query;

		if (!caseRef) {
			throw ApiError.badRequest('Required query parameter caseRef missing');
		}

		const stageFiltersAvailable = await getFilters('Stage', caseRef, classification);
		const typeFiltersAvailable = await getFilters('filter_1', caseRef, classification);

		let typeFilters = [];

		if (type) {
			typeFilters = type instanceof Array ? [...type] : type.split(',');

			if (typeFilters.includes('everything_else')) {
				if (typeFiltersAvailable && typeFiltersAvailable.length > 4) {
					const { result, otherTypesToAdd } = mapFilters(typeFiltersAvailable, 'other');
					const validResult = result && otherTypesToAdd && result.length > 0;

					let everythingElseFilterValues = validResult ? result.slice(4) : [];

					if (otherTypesToAdd.length > 0) {
						everythingElseFilterValues = everythingElseFilterValues.concat(otherTypesToAdd);
					}

					typeFilters = typeFilters.filter((e) => e !== 'everything_else');
					typeFilters.push(everythingElseFilterValues);
				}
			}
		}

		try {
			const documents = await getOrderedDocuments(
				caseRef,
				classification,
				page,
				searchTerm,
				stage && !(stage instanceof Array) ? [stage] : stage,
				typeFilters
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
						? stageFiltersAvailable.map((f) => ({
								name: f.dataValues.Stage,
								count: f.dataValues.count
						  }))
						: [],
					typeFilters: typeFiltersAvailable
						? typeFiltersAvailable.map((f) => ({
								name: f.dataValues.filter_1,
								count: f.dataValues.count
						  }))
						: []
				}
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
	}
};
