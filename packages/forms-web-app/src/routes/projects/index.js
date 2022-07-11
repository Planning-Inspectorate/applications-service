const express = require('express');
const router = express.Router();

const {
	routes: {
		internal: {
			projects: { routes: projectsRoutes }
		}
	},
	routes: {
		internal: {
			projects: {
				project: { routes: projectRoute }
			}
		}
	}
} = require('../../routes/config');

const { getProjects } = require('../../controllers/projects/index');
const {
	getProject,
	getProjectApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectRecommendations,
	getProjectRepresentation,
	getProjectRepresentations,
	getProjectTimeLine,
	getProjectTimetable
} = require('../../controllers/projects/project/_');

router.get(projectsRoutes.index, getProjects);

router.get(projectRoute.examinationDocuments, getProjectExaminationDocuments);
router.get(projectRoute.recommendations, getProjectRecommendations);
router.get(projectRoute.timeline, getProjectTimeLine);
router.get(projectRoute.timetable, getProjectTimetable);

router.get(projectRoute.index, getProject);
router.get(projectRoute.applicationDocuments, getProjectApplicationDocuments);
router.get(projectRoute.representation, getProjectRepresentation);
router.get(projectRoute.representations, getProjectRepresentations);

module.exports = router;
