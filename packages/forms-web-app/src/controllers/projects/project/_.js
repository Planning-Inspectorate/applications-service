const { getProject } = require('./');
const { getProjectApplicationDocuments } = require('./application-documents');
const { getProjectExaminationDocuments } = require('./examination-documents');
const { getProjectRecommendations } = require('./recommendations');
const { getProjectRepresentation, getProjectRepresentations } = require('./representations');
const { getProjectTimeLine } = require('./timeline');
const { getProjectTimetable } = require('./timetable');

module.exports = {
	getProject,
	getProjectApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectRecommendations,
	getProjectRepresentation,
	getProjectRepresentations,
	getProjectTimeLine,
	getProjectTimetable
};
