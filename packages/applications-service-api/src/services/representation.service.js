const db = require('../models');
const config = require('../lib/config');

const getRepresentationsForApplication = async (applicationId, page) => {
  const { itemsPerPage: limit } = config;
  const offset = (page - 1) * limit;
  const where = { CaseReference: applicationId };

  const representations = await db.Representation.findAndCountAll({
    where,
    offset,
    limit,
  });

  return representations;
};

module.exports = {
  getRepresentationsForApplication,
};
