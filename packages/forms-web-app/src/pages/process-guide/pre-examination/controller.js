const { getPageData } = require('./_utils/get-page-data');

const view = 'process-guide/pre-examination/view.njk';

const getPreExaminationController = (req, res) => res.render(view, getPageData());

module.exports = { getPreExaminationController };
