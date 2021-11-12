const { Op } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const getDocuments = async (caseRef, pageNo, searchTerm, filters) => {
  const { itemsPerPage: limit } = config;
  const offset = (pageNo - 1) * limit;

  // SELECT * FROM ipclive.wp_ipc_documents_api where case_reference like 'caseRef'
  // AND (desc like %searchTerm% OR path like %searchTerm% OR filter_1 like %searchTerm% or filter_2 like %searchTerm%)
  // AND filter[0] AND filter[1] ... AND filter[n];

  let where = { case_reference: caseRef };
  if (searchTerm) {
    where = { [Op.and]: [{ case_reference: caseRef }] };
    where[Op.and].push({
      [Op.or]: [
        {
          description: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          path: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          filter_1: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          filter_2: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      ],
    });
  }
  const documents = await db.Document.findAndCountAll({
    where,
    offset,
    limit,
  });

  return documents;
};

module.exports = {
  getDocuments,
};
