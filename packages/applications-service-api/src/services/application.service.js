const db = require('../models');

const getApplication = async (id) => {
  const project = await db.Project.findOne({ where: { CaseReference: id } });
  return project;
};

module.exports = {
  getApplication,
};
