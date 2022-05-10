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
      Stage: { [Op.gt]: 0 },
    });
  } else if (classification === 'application') {
    where[Op.and].push({
      Stage: { [Op.in]: [1, 2, 3] },
    });
  } else if (classification === 'examination') {
    where[Op.and].push({
      Stage: { [Op.eq]: 4 },
    });
  } else if (classification === 'finalisation') {
    where[Op.and].push({
      Stage: { [Op.in]: [5, 6, 7] },
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

const getOrderedDocuments = async (caseRef, classification, pageNo, searchTerm, stage, type) => {
  const { itemsPerPage: limit } = config;
  const offset = (pageNo - 1) * limit;

  const where = { [Op.and]: [{ case_reference: caseRef }] };
  console.log(where);
  addStageClause(where, classification);
  // if (stage) where = { ...where, Stage: { [Op.in]: stage } };
  // if (type) where = { ...where, filter_1: { [Op.in]: type } };

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

    // where = { [Op.and]: [{ case_reference: caseRef, Stage: { [Op.gt]: 0 } }] };

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

const getFilters = async (filter, caseRef, classification) => {
  const where = { [Op.and]: [{ case_reference: caseRef }] };
  addStageClause(where, classification);
  let order = [];
  if (filter === 'Stage') {
    order = [['Stage']];
  }
  const filters = await db.Document.findAll({
    where,
    order,
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
