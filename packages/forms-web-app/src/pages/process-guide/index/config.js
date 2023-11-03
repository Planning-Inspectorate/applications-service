const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const processGuideURL = getProcessGuidePageURL();

const processGuideTitle = 'The process for Nationally Significant Infrastructure Projects (NSIPs)';

module.exports = { processGuideURL, processGuideTitle };
