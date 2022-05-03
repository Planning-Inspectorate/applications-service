const { Op } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

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

const getOrderedDocuments = async (caseRef, pageNo, searchTerm, stage, type) => {
  const { itemsPerPage: limit } = config;
  const offset = (pageNo - 1) * limit;

  let where = { case_reference: caseRef };
  if (stage) where = { ...where, Stage: { [Op.in]: stage } };
  if (type) where = { ...where, filter_1: { [Op.in]: type } };

  if (searchTerm) {
    const orOptions = [
      {
        description: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        personal_name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        representative: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        mime: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    ];

    where = { [Op.and]: [{ case_reference: caseRef }] };

    if (stage) {
      where[Op.and].push({
        Stage: { [Op.in]: stage },
      });
    }

    if (type) {
      where[Op.and].push({
        filter_1: { [Op.in]: type },
      });
    }

    where[Op.and].push({
      [Op.or]: orOptions,
    });
  }

  const documents = await db.Document.findAndCountAll({
    where,
    offset,
    order: [['date_published', 'DESC']],
    limit,
  });

  return documents;
};

const getFilters = async (filter) => {
  const filters = await db.Document.findAll({
    attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
    group: [filter],
  });

  return filters;
};

module.exports = {
  getDocuments,
  getOrderedDocuments,
  getFilters,
};
