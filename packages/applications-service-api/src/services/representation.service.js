const { Op } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const getRepresentationsForApplication = async (applicationId, page, searchTerm, type) => {
  const { itemsPerPage: limit } = config;
  const offset = (page - 1) * limit;
  let where = { CaseReference: applicationId };
  if (type) where = { ...where, RepFrom: { [Op.in]: type } };

  if (searchTerm) {
    const orOptions = [
      {
        PersonalName: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        RepresentationRedacted: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      {
        Representative: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    ];

    where = { [Op.and]: [{ CaseReference: applicationId }] };

    if (type) {
      where[Op.and].push({
        RepFrom: { [Op.in]: type },
      });
    }

    where[Op.and].push({
      [Op.or]: orOptions,
    });
  }

  const representations = await db.Representation.findAndCountAll({
    where,
    offset,
    order: [['DateRrepReceived', 'DESC']],
    limit,
  });

  return representations;
};

const getRepresentationById = async (ID) => {
  return db.Representation.findOne({ where: { ID } });
};
const getFilters = async (filter, applicationId) => {
  let where = { CaseReference: applicationId };

  if (filter === 'RepFrom') {
    where = { CaseReference: applicationId, RepFrom: { [Op.ne]: null } };
  }

  const filters = await db.Representation.findAll({
    where,
    attributes: [filter, [db.sequelize.fn('COUNT', db.sequelize.col(filter)), 'count']],
    group: [filter],
  });

  return filters;
};

module.exports = {
  getRepresentationsForApplication,
  getRepresentationById,
  getFilters,
};
