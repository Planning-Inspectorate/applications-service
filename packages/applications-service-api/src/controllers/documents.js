const R = require('ramda');
const logger = require('../lib/logger');
const config = require('../lib/config');

const {
  getDocuments: getDocumentsFromDocumentsApiService,
} = require('../services/document.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getDocuments(req, res) {
    const { caseRef } = req.params;
    const { pageNo = 1, searchTerm = null, filters = null } = req.body;

    logger.debug(`Retrieving documents by case reference ${caseRef} ...`);
    try {
      const documents = await getDocumentsFromDocumentsApiService(
        caseRef,
        pageNo,
        searchTerm,
        filters
      );

      if (!documents.rows.length) {
        throw ApiError.noDocumentsFound();
      }

      const { itemsPerPage, documentsHost } = config;
      const totalItems = documents.count;
      const byType = R.groupBy(R.prop('type'));
      const rows = documents.rows.map((row) => ({
        ...row.dataValues,
        path: row.dataValues.path ? `${documentsHost}${row.dataValues.path}` : null,
      }));

      const wrapper = {
        documents: [byType(rows)],
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
};
