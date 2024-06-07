const { formatDate } = require('../../../../../utils/date-utils');

const getStageLabel = (stageLabel, language) => (stageLabel ? stageLabel[language] : '');

const formatDocumentToViewModel = (document, { language }) => ({
	date_published: formatDate(document.datePublished, language),
	description: document.description,
	personal_name: document.personalName,
	mime: document.mime,
	size: document.size,
	representative: document.representative,
	Stage: document.stage,
	path: document.path,
	filter_1: document.filter1,
	stageLabel: getStageLabel(document.stageLabel, language)
});

const mapDocumentsToViewModel = (i18n, documents) =>
	documents.map((document) => formatDocumentToViewModel(document, i18n));

module.exports = {
	formatDocumentToViewModel,
	mapDocumentsToViewModel
};
