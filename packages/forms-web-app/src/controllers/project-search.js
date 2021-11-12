const config = require('../config');
const {Status} = require('../utils/status')
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppList } = require('../services/application-list.service');

function getJsonDetails(app) {
  item = {}
  item ["ProjectName"] = app.ProjectName;
  item ["CaseReference"] = app.CaseReference;
  item ["PromoterName"] = app.PromoterName;
  item ["Stage"] = Status[app.Stage];
  return item;
}
exports.getProjectList = async (req, res) => {

  const appList = await getAppList();
  const noOfProjects = appList.length;
  let requiredAppdata = [];
  for(var i = 0; i < noOfProjects; i++) {
    let obj = getJsonDetails(appList[i]);
    requiredAppdata.push(obj);
  }
  res.render(VIEW.PROJECT_SEARCH, {appList: requiredAppdata, noOfProjects: noOfProjects});
};
