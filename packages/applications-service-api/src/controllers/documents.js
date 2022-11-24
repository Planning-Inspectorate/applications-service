const logger = require('../lib/logger');
const config = require('../lib/config');
const { mapFilters } = require('../utils/map-filters');
const { getCategoryFilterType } = require('../utils/get-category-filter-type');

const { getOrderedDocuments, getFilters } = require('../services/document.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getV2Documents(req, res) {
		const { caseRef, page = 1, searchTerm, stage, classification, type, category } = req.query;

		const categoryFilters = category ? ["Developer's Application"] : [];

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

				const categoryTypeFilters = categoryTypeFiltersDBResponse
					? deepCopyArray(categoryTypeFiltersDBResponse)
					: categoryTypeFiltersDBResponse;

				return [
					stageFiltersAvailableDBResponse,
					typeFiltersAvailableDBResponse,
					categoryTypeFilters
				];
			} catch (error) {
				throw ApiError.noDocumentsFound('getAllFiltersFunc failed!');
			}
		};

		const [stageFiltersAvailableDBResponse, typeFiltersAvailableDBResponse, categoryTypeFilters] =
			await getAllFiltersFunc();

		let typeFilters = [];

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
				typeFilters,
				categoryFilters
			);

			const { itemsPerPage, documentsHost } = config;
			const totalItems = documents.count ?? 0;
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
					stageFilters:
						stageFiltersAvailableDBResponse && stageFiltersAvailableDBResponse.length > 0
							? stageFiltersAvailableDBResponse
									.map((f) => ({
										name: f.dataValues.Stage ?? '',
										count: f.dataValues.count ?? 0
									}))
									.filter(({ name, count }) => name && count)
							: [],
					typeFilters:
						typeFiltersAvailableDBResponse && typeFiltersAvailableDBResponse.length > 0
							? typeFiltersAvailableDBResponse
									.map((f) => ({
										name: f.dataValues.filter_1 ?? '',
										count: f.dataValues.count ?? 0
									}))
									.filter(({ name, count }) => name && count)
							: [],
					categoryFilters:
						categoryTypeFilters && categoryTypeFilters.length > 0
							? getCategoryFilterType(categoryTypeFilters, "Developer's Application")
							: []
				}
			};

			logger.debug(`Documents for project ${caseRef} retrieved`);
			res.status(200).send(wrapper);
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
			}
			logger.error(e.message);
			res.status(500).send(`Problem getting documents for project ${caseRef} \n ${e}`);
		}
	}
};
