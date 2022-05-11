const logger = require('../../lib/logger');
const { Status: projectStageNames } = require('../../utils/status');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchDocumentsV2 } = require('../../services/document.service');

function renderData(
  req,
  res,
  searchTerm,
  params,
  response,
  projectName,
  stageList = [],
  typeList = []
) {
  const { caseRef } = params;

  if (response.resp_code === 404) {
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      projectName,
      caseRef,
      searchTerm,
    });
  } else {
    let queryUrl = '';
    if (params.searchTerm) {
      queryUrl = `?searchTerm=${params.searchTerm}`;
    }
    const respData = response.data;
    const { documents, filters } = respData;
    const { stageFilters, typeFilters } = filters;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const paginationData = getPaginationData(respData);
    const pageOptions = calculatePageOptions(paginationData);
    const modifiedStageFilters = [];
    const top5TypeFilters = [];
    let otherTypeFiltersCount = 0;
    typeFilters.sort(function (a, b) {
      return b.count - a.count;
    });

    stageFilters.forEach(function (stage) {
      modifiedStageFilters.push({
        text: `${projectStageNames[stage.name]} (${stage.count})`,
        value: stage.name,
        checked: stageList.includes(stage.name),
      });
    }, Object.create(null));

    typeFilters.slice(-(typeFilters.length - 5)).forEach(function (type) {
      otherTypeFiltersCount += type.count;
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
          checked: typeList.includes(type.name),
        });
      }, Object.create(null));
    if (typeFilters.length > 5) {
      top5TypeFilters.push({
        text: `Everything else (${otherTypeFiltersCount})`,
        value: 'everything_else',
        checked: typeList.includes('everything_else'),
      });
    }
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef,
      paginationData,
      pageOptions,
      searchTerm,
      queryUrl,
      modifiedStageFilters,
      top5TypeFilters,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const applicationResponse = await getAppData(req.params.case_ref);
  const projectName = applicationResponse.data.ProjectName;
  const queryArray = req.url.split('?');
  const query = queryArray.length > 1 ? queryArray[1] : '';
  const params = {
    ...{ caseRef: req.params.case_ref },
    ...{ page: req.params.page },
  };
  const { searchTerm, stage, type } = req.query;
  const response = await searchDocumentsV2(params, query);
  renderData(req, res, searchTerm, params, response, projectName, stage, type);
};
