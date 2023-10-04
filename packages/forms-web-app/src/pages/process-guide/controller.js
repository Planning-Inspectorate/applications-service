const { getPageData } = require('./_utils/get-page-data');

const view = 'process-guide/view.njk';

const getProcessGuideController = (req, res) => res.render(view, getPageData());

module.exports = { getProcessGuideController };
