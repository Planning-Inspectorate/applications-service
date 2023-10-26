const { getPageData } = require('./_utils/get-page-data');

const view = 'process-guide/pre-application/view.njk';

const getPreApplicationController = (req, res) => res.render(view, getPageData());

module.exports = { getPreApplicationController };
