const R = require('ramda');
const { unslugify } = require('unslugify');
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
    const { caseRef, page, searchTerm, stage, type } = req.query;

    if (!caseRef) {
      throw ApiError.badRequest('Required query parameter caseRef missing');
    }

    const slugified = type && !(type instanceof Array) ? [type] : type;

    logger.debug(`Retrieving documents by case reference ${caseRef} ...`);
    try {
      const documents = await getOrderedDocuments(
        caseRef,
        page || 1,
        searchTerm,
        stage && !(stage instanceof Array) ? [stage] : stage,
        slugified && slugified.map((s) => unslugify(s))
      );

      if (!documents.rows.length) {
        throw ApiError.noDocumentsFound();
      }

      const stageFilters = await getFilters('Stage');
      const typeFilters = await getFilters('filter_1');

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
