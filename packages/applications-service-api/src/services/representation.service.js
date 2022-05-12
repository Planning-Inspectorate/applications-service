const { Op } = require('sequelize');
const db = require('../models');
const config = require('../lib/config');

const getRepresentationsForApplication = async (applicationId, page, searchTerm) => {
  const { itemsPerPage: limit } = config;
  const offset = (page - 1) * limit;
  let where = { CaseReference: applicationId };

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

module.exports = {
  getRepresentationsForApplication,
  getRepresentationById,
};
