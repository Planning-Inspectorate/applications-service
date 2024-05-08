const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const processGuideURL = getProcessGuidePageURL();

const processGuideTitle = 'The process for Nationally Significant Infrastructure Projects (NSIPs)';

const processGuideIndexI18nNamespace = 'processGuideIndex';

module.exports = { processGuideURL, processGuideTitle, processGuideIndexI18nNamespace };
