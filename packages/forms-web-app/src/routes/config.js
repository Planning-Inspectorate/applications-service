const routes = {
	external: {
		emailSignUpURL: 'https://nitestaz.planninginspectorate.gov.uk/email-subscription.php'
	},
	internal: {
		projects: {
			index: '/projects',
			projects: '/',
			project: {
				applicationDocuments: '/:case_ref/application-documents',
				examinationDocuments: '/all-examination-documents',
				overview: '/:case_ref',
				recommendations: '/recommendations',
				representation: '/:case_ref/representations/:id',
				representations: '/:case_ref/representations',
				timeline: '/project-timeline',
				timetable: '/timetable'
			}
		}
	}
};

module.exports = {
	routes
};
