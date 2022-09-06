const routesConfig = {
	examination: {
		directory: '/examination',
		pages: {
			haveYourSay: {
				id: 'examination-have-your-say',
				name: 'Have your say during the Examination of the application',
				route: '/have-your-say-during-examination',
				view: 'pages/examination/have-your-say'
			},
			submittingFor: {
				id: 'examination-submitting-for',
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
			yourName: {
				id: 'examination-your-name',
				name: 'What is your full name?',
				route: '/your-name',
				view: 'pages/examination/your-name'
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
