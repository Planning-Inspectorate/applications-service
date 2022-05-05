const db = require('../models');

const getRepresentationsForApplication = async (applicationId) => {
  return db.Representation.findAll({ where: { CaseReference: applicationId } });
};

module.exports = {
  getRepresentationsForApplication,
};
