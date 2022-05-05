const { Op } = require('sequelize');
const db = require('../models');

const getRepresentationsForApplication = async (applicationId, searchTerm) => {
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

  return db.Representation.findAll({ where, order: [['DateRrepReceived', 'DESC']] });
};

module.exports = {
  getRepresentationsForApplication,
};
