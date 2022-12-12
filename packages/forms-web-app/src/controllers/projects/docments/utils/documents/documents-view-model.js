const { formatDate } = require('../../../../../utils/date-utils');
const mapDocumentsToViewModel = (documents) =>
	documents.map((document) => ({
		date_published: formatDate(document.datePublished),
		description: document.description,
		personal_name: document.personalName,
		mime: document.mime,
		size: document.size,
		representative: document.representative,
		Stage: document.stage,
		path: document.path,
		filter_1: document.filter1
	}));

module.exports = {
	mapDocumentsToViewModel
};
