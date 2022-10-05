const routesConfig = {
	examination: {
		directory: '/examination',
		sessionId: 'examination',
		pages: {
			applicant: {
				id: 'examination-applicant',
				onError: {
					message: {
						isEmpty: 'Select yes if you are #'
					}
				},
				options: {
					1: {
						value: 'yes',
						text: 'Yes'
					},
					2: {
						value: 'no',
						text: 'No'
					}
				},
				route: '/are-you-applicant',
				title: 'Are you #?',
				view: 'pages/examination/applicant'
			},
			checkYourAnswers: {
				id: 'examination-check-your-answers',
				name: 'Check your answers',
				route: '/check-your-answers',
				view: 'pages/examination/check-your-answers'
			},
			email: {
				id: 'examination-email',
				name: `What's your email address?`,
				route: '/your-email-address',
				view: 'pages/examination/email',
				onError: {
					message: {
						checkLength: 'Your email address must be between 3 and 255 characters',
						notEmpty: 'Enter your email address'
					},
					minMaxOptions: {
						min: 3,
						max: 255
					}
				}
			},
			enterComment: {
				id: 'examination-enter-comment',
				name: 'Enter comment',
				route: '/enter-a-comment',
				view: 'pages/examination/enter-comment'
			},
			evidenceOrComment: {
				id: 'examination-evidence-or-comment',
				name: 'How would you like to submit comments ("written representation")?',
				onError: {
					message: {
						isEmpty: 'Select if you want to upload supporting evidence or write a comment'
					}
				},
				options: {
					1: {
						value: 'comment',
						text: 'Write a comment'
					},
					2: {
						value: 'upload',
						text: 'Upload files'
					},
					3: {
						value: 'both',
						text: 'Both'
					}
				},
				route: '/select-upload-evidence-or-comment',
				sessionId: 'submissionType',
				view: 'pages/examination/evidence-or-comment'
			},
			enterAComment: {
				id: 'examination-enter-a-comment',
				name: 'Make a comment',
				route: '/enter-a-comment',
				view: 'pages/examination/enter-a-comment',
				onError: {
					message: {
						checkLength: 'Your comment must be 65,234 characters or less',
						notEmpty: 'Enter a comment'
					},
					minMaxOptions: {
						min: 1,
						max: 65234
					}
				}
			},
			haveYourSay: {
				id: 'examination-have-your-say',
				name: 'Have your say during the Examination of the application',
				route: '/have-your-say-during-examination',
				view: 'pages/examination/have-your-say'
			},
			hasInterestedPartyNumber: {
				id: 'examination-has-interested-party-number',
				name: 'Do you have an interested party number?',
				onError: {
					message: {
						isEmpty: 'Select yes if you have an interested party number'
					}
				},
				options: {
					1: {
						value: 'yes',
						text: 'Yes'
					},
					2: {
						value: 'no',
						text: 'No'
					}
				},
				route: '/have-an-interested-party-number',
				view: 'pages/examination/has-interested-party-number'
			},
			nameAgent: {
				id: 'examination-name',
				name: 'Name of person or group',
				title: "What's the full name of the person, family group or organisation?",
				pageTitle: "What's the full name of the person, family group or organisation?",
				onError: {
					message: {
						checkLength:
							"The full name of the person, family group or organisation organisation's name must be between 1 and 255 characters",
						notEmpty: 'Enter the full name of the person, family group or organisation'
					},
					minMaxOptions: {
						min: 1,
						max: 255
					}
				},
				route: '/name-of-person-or-group',
				view: 'pages/examination/name'
			},
			nameMyself: {
				id: 'examination-name',
				name: 'What is your full name?',
				title: 'What is your full name?',
				pageTitle: 'What is your full name?',
				onError: {
					message: {
						checkLength: 'Full name must be between 3 and 64 characters',
						notEmpty: 'Enter your full name'
					},
					minMaxOptions: {
						min: 3,
						max: 64
					}
				},
				route: '/your-name',
				view: 'pages/examination/name'
			},
			nameOrganisation: {
				id: 'examination-name',
				name: 'Name of organisation',
				title: `What’s your organisation's name?`,
				pageTitle: `What’s your organisation's name?`,
				onError: {
					message: {
						checkLength: "Your organisation's name must be between 1 and 255 characters",
						notEmpty: "Enter your organisation's name"
					},
					minMaxOptions: {
						min: 1,
						max: 255
					}
				},
				route: '/your-organisation-name',
				view: 'pages/examination/name'
			},
			selectDeadline: {
				id: 'examination-select-deadline',
				name: 'Which item would you like to submit against for this deadline?',
				onError: {
					message: {
						isEmpty: 'Select an item'
					}
				},
				route: '/select-deadline-item',
				sessionIdPrimary: 'selectedDeadlineItems',
				sessionIdSecondary: 'activeId',
				sessionIdTertiary: 'items',
				view: 'pages/examination/select-deadline'
			},
			selectFile: {
				id: 'examination-select-file',
				name: 'Select a file',
				route: '/select-a-file',
				view: 'pages/examination/select-file'
			},
			submittingFor: {
				id: 'examination-submitting-for',
				errorMessage: 'Select who you are submitting for',
				name: 'Who are you making the submission for?',
				onError: {
					message: {
						isEmpty: 'Select who you are submitting for'
					}
				},
				options: {
					1: {
						value: 'myself',
						text: 'Myself'
					},
					2: {
						value: 'organisation',
						text: 'An organisation I work for'
					},
					3: {
						value: 'agent',
						text: 'On behalf of another person, a family group or another organisation I do not work for'
					}
				},
				route: '/who-are-you-submitting-for',
				view: 'pages/examination/submitting-for'
			},
			yourInterestedPartyNumber: {
				id: 'examination-your-interested-party-number',
				name: "What's your interested party number?",
				onError: {
					message: {
						checkLength: 'Your interested party number must be between 3 and 20 characters',
						notEmpty: 'Enter your interested party number'
					},
					minMaxOptions: {
						min: 3,
						max: 20
					}
				},
				route: '/your-interested-party-number',
				view: 'pages/examination/your-interested-party-number'
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
