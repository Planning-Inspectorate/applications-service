const express = require('express');
const router = express.Router();

const {
	routes: {
		internal: { projects: projectsRoute }
	},
	routes: {
		internal: {
			projects: { project: projectRoute }
		}
	}
} = require('../../routes/config');

const { getProjects } = require('../../controllers/projects');
const {
	getProjectApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectOverview,
	getProjectRecommendations,
	getProjectRepresentation,
	getProjectRepresentations,
	getProjectTimeLine,
	getProjectTimetable
} = require('../../controllers/projects/project');

router.get(projectsRoute.projects, getProjects);
router.get(projectRoute.examinationDocuments, getProjectExaminationDocuments);
router.get(projectRoute.recommendations, getProjectRecommendations);
router.get(projectRoute.timetable, getProjectTimetable);
router.get(projectRoute.timeline, getProjectTimeLine);
router.get(projectRoute.applicationDocuments, getProjectApplicationDocuments);
router.get(projectRoute.representations, getProjectRepresentations);
router.get(projectRoute.representation, getProjectRepresentation);
router.get(projectRoute.overview, getProjectOverview);

module.exports = router;
