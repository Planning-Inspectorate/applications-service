const config = require('../config');
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application-list.service');

exports.getDocumentLibrary = async (req, res) => {
  const appData = await getAppData(req.params.case_ref);
  logger.info(appData);
  let styleClass = [];
  for (let i = 1; i <= 5; i++) {
    if (i === appData.Stage) {
      styleClass.push('class=current');
    } else if (i < appData.Stage) {
      styleClass.push('class=completed');
    } else {
      styleClass.push('');
    }
  } 
  logger.info(styleClass);
  res.render(VIEW.DOCUMENT_OVERVIEW);
};

exports.postSearchDocumentLibrary = async (req, res) => {
  const { body } = req;
  //const { application } = req.session;
  const search = body['search'];
  req.session.document =  search;
  const appData = await getAppData(req.params.case_ref);

  res.render(VIEW.DOCUMENT_OVERVIEW);
};

exports.postFilterDocumentLibrary = async (req, res) => {
  const { body } = req;
  const theme = body['theme'];

  // console.log('----------------------------------'+theme);
  logger.info('----------------------------------'+JSON.stringify(body));
  const appData = await getAppData(req.params.case_ref);

  res.render(VIEW.DOCUMENT_OVERVIEW);
};
