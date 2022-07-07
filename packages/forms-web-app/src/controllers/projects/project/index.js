const { getProjectApplicationDocuments } = require('./application-documents');
const { getProjectExaminationDocuments } = require('./examination-documents');
const { getProjectOverview } = require('./overview');
const { getProjectRecommendations } = require('./recommendations');
const { getProjectRepresentation, getProjectRepresentations } = require('./representations');
const { getProjectTimeLine } = require('./timeline');
const { getProjectTimetable } = require('./timetable');

module.exports = {
	getProjectApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectOverview,
	getProjectRecommendations,
	getProjectRepresentation,
	getProjectRepresentations,
	getProjectTimeLine,
	getProjectTimetable
};
