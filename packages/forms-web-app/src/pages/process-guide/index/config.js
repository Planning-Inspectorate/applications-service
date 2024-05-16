const { getProcessGuidePageURL } = require('../_utils/get-process-guide-page-url');

const processGuideURL = getProcessGuidePageURL();

const processGuideIndexI18nNamespace = 'processGuideIndex';

module.exports = { processGuideURL, processGuideIndexI18nNamespace };
