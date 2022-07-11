const routes = {
	internal: {
		projects: {
			directory: '/projects',
			routes: {
				index: '/'
			},
			project: {
				directory: '/case_ref',
				routes: {
					applicationDocuments: '/:case_ref/application-documents',
					examinationDocuments: '/all-examination-documents',
					index: '/:case_ref',
					recommendations: '/recommendations',
					representation: '/:case_ref/representations/:id',
					representations: '/:case_ref/representations',
					timeline: '/project-timeline',
					timetable: '/timetable'
				}
			}
		}
	}
};

module.exports = {
	routes
};
