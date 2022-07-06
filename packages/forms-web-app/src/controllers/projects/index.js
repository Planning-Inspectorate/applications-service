const { getProjectsApplicationDocuments } = require('./application-documents');
const { getProjectExaminationDocuments } = require('./examination-documents');
const { getProjectsOverview } = require('./overview');
const { getProjectsTimeLine } = require('./timeline');

module.exports = {
	getProjectsApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectsOverview,
	getProjectsTimeLine
};
