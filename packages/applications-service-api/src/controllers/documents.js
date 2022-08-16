const R = require('ramda');
const logger = require('../lib/logger');
const config = require('../lib/config');
const { mapFilters } = require('../utils/map-filters');
const { getCategoryFilterType } = require('../utils/get-category-filter-type');

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

		const numberOfFiltersToDisplay = 5;

		const deepCopyArray = (array) => {
			if (!array || !Array.isArray(array) || array.length === 0) return;
			return JSON.parse(JSON.stringify(array));
		};

		if (!caseRef) {
			throw ApiError.badRequest('Required query parameter caseRef missing');
		}

		const getAllFiltersFunc = async () => {
			try {
				const stageFiltersAvailableDBResponse = await getFilters('Stage', caseRef, classification);

				const typeFiltersAvailableDBResponse = await getFilters(
					'filter_1',
					caseRef,
					classification
				);

				const categoryTypeFiltersDBResponse = await getFilters('category', caseRef, classification);

				const stageFiltersAvailable = stageFiltersAvailableDBResponse
					? deepCopyArray(stageFiltersAvailableDBResponse)
					: stageFiltersAvailableDBResponse;

				const typeFiltersAvailable = typeFiltersAvailableDBResponse
					? deepCopyArray(typeFiltersAvailableDBResponse)
					: typeFiltersAvailableDBResponse;

				const categoryTypeFilters = categoryTypeFiltersDBResponse
					? deepCopyArray(categoryTypeFiltersDBResponse)
					: categoryTypeFiltersDBResponse;

				return [
					[stageFiltersAvailableDBResponse, stageFiltersAvailable],
					[typeFiltersAvailableDBResponse, typeFiltersAvailable],
					[categoryTypeFilters]
				];
			} catch (error) {
				throw ApiError.noDocumentsFound('getAllFiltersFunc failed!');
			}
		};

		const [
			[stageFiltersAvailableDBResponse, stageFiltersAvailable],
			[typeFiltersAvailableDBResponse, typeFiltersAvailable],
			[categoryTypeFilters]
		] = await getAllFiltersFunc();

		console.error({
			stageFiltersAvailableDBResponse,
			stageFiltersAvailable,
			typeFiltersAvailableDBResponse,
			typeFiltersAvailable,
			categoryTypeFilters
		});

		// if (categoryTypeFilters) {
		// 	const result = getCategoryFilterType(categoryTypeFilters, "Developer's Application");

		// console.error({ result, resultFilter_1: result.filter_1 });

		// result && typeFiltersAvailable.unshift(result);
		// }

		let typeFilters = ["Developer's Application"];

		if (type) {
			typeFilters = type instanceof Array ? [...type] : type.split(',');

			if (typeFilters.includes('everything_else')) {
				if (
					typeFiltersAvailableDBResponse &&
					typeFiltersAvailableDBResponse.length > numberOfFiltersToDisplay
				) {
					const { result, otherTypesToAdd } = mapFilters(typeFiltersAvailableDBResponse, 'other');
					const validResult = result && otherTypesToAdd && result.length > 0;

					let everythingElseFilterValues = validResult
						? result.slice(numberOfFiltersToDisplay)
						: [];

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

			console.log({
				documentsX: documents,
				typeFiltersAvailableEEE: typeFiltersAvailable
			});

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
					stageFilters: stageFiltersAvailableDBResponse
						? stageFiltersAvailableDBResponse
								.map((f) => ({
									name: f.dataValues.Stage ?? '',
									count: f.dataValues.count ?? 0
								}))
								.filter(({ name, count }) => name && count)
						: [],
					typeFilters: typeFiltersAvailableDBResponse
						? typeFiltersAvailableDBResponse
								.map((f) => ({
									name: f.dataValues.filter_1 ?? '',
									count: f.dataValues.count ?? 0
								}))
								.filter(({ name, count }) => name && count)
						: [],
					categoryFilters: categoryTypeFilters
						? getCategoryFilterType(categoryTypeFilters, "Developer's Application")
						: []
				}
			};

			logger.debug(`Documents for project ${caseRef} retrieved`);
			res.status(200).send(wrapper);
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				console.error(e);
				// res.status(e.code).send({ code: e.code, errors: e.message.errors });
			}
			console.error(e);
			logger.error(e.message);
			// res.status(500).send(`Problem getting documents for project ${caseRef} \n ${e}`);
		}
	}
};
