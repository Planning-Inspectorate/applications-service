const routesConfig = {
	examination: {
		directory: '/examination',
		pages: {
			applicant: {
				id: 'examination-applicant',
				name: 'Are you the applicant?',
				route: '/are-you-applicant',
				view: 'pages/examination/applicant'
			},
			checkYourAnswers: {
				id: 'examination-check-your-answers',
				name: 'Check your answers',
				route: '/check-your-answers',
				view: 'pages/examination/check-your-answers'
			},
			haveYourSay: {
				id: 'examination-have-your-say',
				name: 'Have your say during the Examination of the application',
				route: '/have-your-say-during-examination',
				view: 'pages/examination/have-your-say'
			},
			submittingFor: {
				id: 'examination-submitting-for',
				errorMessage: 'Select who you are submitting for',
				name: 'Who are you making the submission for?',
				route: '/who-are-you-submitting-for',
				view: 'pages/examination/submitting-for'
			},
			yourInterestedPartyNumber: {
				id: 'examination-your-interested-party-number',
				name: "What's your interested party number?",
				route: '/your-interested-party-number',
				view: 'pages/examination/your-interested-party-number'
			},
			haveAnInterestedPartyNumber: {
				id: 'examination-have-an-interested-party-number',
				name: 'Do you have an interested party number?',
				route: '/have-an-interested-party-number',
				view: 'pages/examination/have-an-interested-party-number'
			},
			nameAgent: {
				id: 'examination-name-agent',
				name: 'Name of person or group',
				route: '/name-of-person-or-group',
				view: 'pages/examination/name'
			},
			nameMyself: {
				id: 'examination-name-myself',
				name: 'What is your full name?',
				route: '/your-name',
				view: 'pages/examination/name'
			},
			nameOrganisation: {
				id: 'examination-name-organisation',
				name: 'Name of organisation',
				route: '/your-organisation-name',
				view: 'pages/examination/name'
			}
		}
	},
	project: {
		directory: '/projects',
		subDirectory: '/:case_ref',
		pages: {
			examinationTimetable: {
				id: 'project-examination-timetable',
				name: 'Examination timetable',
				route: '/examination-timetable',
				view: 'projects/examination-timetable'
			}
		}
	}
};

module.exports = { routesConfig };
