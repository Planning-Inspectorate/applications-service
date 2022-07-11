const routes = {
	internal: {
		decisionMakingProcessGuide: {
			routes: {
				afterDecision: '/what-happens-after-the-decision-is-made',
				applicationExamination: '/examination-of-the-application',
				applicationReview: '/review-of-the-application',
				index: '/',
				preApplication: '/pre-application',
				preExamination: '/pre-examination',
				recommendationAndDecision: '/recommendation-and-decision'
			},
			subdirectory: '/decision-making-process-guide'
		},
		projects: {
			routes: {
				index: '/'
			},
			subdirectory: '/projects',
			project: {
				routes: {
					applicationDocuments: '/:case_ref/application-documents',
					examinationDocuments: '/all-examination-documents',
					index: '/:case_ref',
					recommendations: '/recommendations',
					representation: '/:case_ref/representations/:id',
					representations: '/:case_ref/representations',
					timeline: '/project-timeline',
					timetable: '/timetable'
				},
				subdirectory: '/case_ref'
			}
		}
	}
};

module.exports = {
	routes
};
