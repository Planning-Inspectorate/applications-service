const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const processGuideURL = getProcessGuidePageURL();

const processGuideTitle = 'The process for Nationally Significant Infrastructure Projects (NSIPs)';

const processGuideI18nNamespace = 'processGuide';

module.exports = { processGuideURL, processGuideTitle, processGuideI18nNamespace };
