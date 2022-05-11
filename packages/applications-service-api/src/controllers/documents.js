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
        path: row.dataValues.path ? `${documentsHost}${row.dataValues.path}` : null,
      }));

      const wrapper = {
        documents: Object.entries(byStage(rows)).map((e) => ({ [e[0]]: byType(e[1]) })),
        totalItems,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage: pageNo,
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
    const { caseRef, page, searchTerm, stage } = req.query;
    let { type } = req.query;
    let isEveryThingElseSelected = false;
    const typeNotToSearch = [];

    if (type && type.includes('everything_else')) {
      isEveryThingElseSelected = true;

      const typeFilters = await getFilters('filter_1', caseRef);
      typeFilters.sort(function (a, b) {
        return JSON.parse(JSON.stringify(b)).count - JSON.parse(JSON.stringify(a)).count;
      });
      const top5TypeFilters = typeFilters.slice(0, 5);

      const typeFiltersNotToSearch = top5TypeFilters.filter((t) => !type.includes(t.filter_1));

      typeFiltersNotToSearch.forEach(function (t) {
        typeNotToSearch.push(JSON.parse(JSON.stringify(t)).filter_1);
      }, Object.create(null));
    }

    if (!caseRef) {
      throw ApiError.badRequest('Required query parameter caseRef missing');
    }
    if (isEveryThingElseSelected) {
      type = typeNotToSearch;
    }
    const slugified = type && !(type instanceof Array) ? [type] : type;
    logger.debug(`Retrieving documents by case reference ${caseRef} ...`);
    try {
      const documents = await getOrderedDocuments(
        isEveryThingElseSelected,
        caseRef,
        page || 1,
        searchTerm,
        stage && !(stage instanceof Array) ? [stage] : stage,
        slugified
      );
      if (!documents.rows.length) {
        throw ApiError.noDocumentsFound();
      }

      const stageFilters = await getFilters('Stage', caseRef);
      const typeFilters = await getFilters('filter_1', caseRef);

      const { itemsPerPage, documentsHost } = config;
      const totalItems = documents.count;
      const rows = documents.rows.map((row) => ({
        ...row.dataValues,
        path: row.dataValues.path ? `${documentsHost}${row.dataValues.path}` : null,
      }));

      const wrapper = {
        documents: rows,
        totalItems,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage: page,
        filters: {
          stageFilters: stageFilters
            ? stageFilters.map((f) => ({
                name: f.dataValues.Stage,
                count: f.dataValues.count,
              }))
            : [],
          typeFilters: typeFilters
            ? typeFilters.map((f) => ({
                name: f.dataValues.filter_1,
                count: f.dataValues.count,
              }))
            : [],
        },
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
};
