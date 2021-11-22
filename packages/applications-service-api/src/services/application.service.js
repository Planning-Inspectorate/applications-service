const db = require('../models');

function addMapZoomLvlAndLongLat(project) {
  const rawValue = project.getDataValue('LatLong');
  const latLong = rawValue.split(',');
  const LongLat = [latLong[1], latLong[0]];
  let application = db.Project.build({
    ...project.dataValues,
    MapZoomLevel: project.MapZoomLevel,
  });
  application = { ...application.dataValues, LongLat };
  delete application.LatLong;
  return application;
}

const getApplication = async (id) => {
  const project = await db.Project.findOne({ where: { CaseReference: id } });
  return addMapZoomLvlAndLongLat(project);
};

const getAllApplications = async () => {
  const projects = await db.Project.findAll().map((project) => {
    return addMapZoomLvlAndLongLat(project);
  });

  return projects;
};

module.exports = {
  getApplication,
  getAllApplications,
};
