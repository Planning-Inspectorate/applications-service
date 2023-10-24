const { getPageData } = require('../pre-application/_utils/get-page-data');

const view = 'process-guide/examination/view.njk';

const getExaminationController = (req, res) => res.render(view, getPageData());

module.exports = { getExaminationController };
