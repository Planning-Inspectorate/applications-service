const logger = require('../../lib/logger');
const { Status: projectStageNames } = require('../../utils/status');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { searchDocumentsV2 } = require('../../services/document.service');

function renderData(req, res, params, response) {
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      projectName,
      caseRef: params.caseRef,
      searchTerm: params.searchTerm,
    });
  } else {
    let queryUrl = '';
    if (params.searchTerm) {
      queryUrl = `&searchTerm=${params.searchTerm}`;
    }
    const respData = response.data;
    const { documents, filters } = respData;
    const { stageFilters, typeFilters } = filters;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const paginationData = getPaginationData(respData);
    const pageOptions = calculatePageOptions(paginationData);
    const modifiedStageFilters = [];
    const top5TypeFilters = [];
    const otherTypeFilters = [];
    typeFilters.sort(function (a, b) {
      return b.count - a.count;
    });

    stageFilters.forEach(function (stage) {
      modifiedStageFilters.push({
        text: `${projectStageNames[stage.name]} (${stage.count})`,
        value: stage.name,
      });
    }, Object.create(null));

    typeFilters
      .slice(0, 5)
      .sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
      .forEach(function (type) {
        top5TypeFilters.push({
          text: `${type.name} (${type.count})`,
          value: type.name,
        });
      }, Object.create(null));

    typeFilters.slice(-(typeFilters.length - 5)).forEach(function (type) {
      otherTypeFilters.push({
        text: `${type.name} (${type.count})`,
        value: type.name,
      });
    }, Object.create(null));

    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef: params.caseRef,
      paginationData,
      pageOptions,
      searchTerm: params.searchTerm,
      queryUrl,
      modifiedStageFilters,
      top5TypeFilters,
      otherTypeFilters,
    });
  }
}

exports.getApplicationDocuments = async (req, res) => {
  const params = {
    caseRef: req.params.case_ref,
    classification: 'application',
    page: '1',
    ...req.query,
  };
  const response = await searchDocumentsV2(params);
  renderData(req, res, params, response);
};
