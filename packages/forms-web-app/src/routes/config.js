const routesConfig = {
	examination: {
		directory: '/examination',
		baseDirectory: 'examination',
		sessionId: 'examination',
		pages: {
			addDeadline: {
				id: 'examination-add-deadline',
				name: 'Add another deadline?',
				route: 'add-another-deadline-item',
				view: 'pages/examination/add-deadline'
			},
			applicant: {
				id: 'examination-applicant',
				route: 'are-you-applicant'
			},
			checkSubmissionItem: {
				id: 'examination-check-submission-item',
				route: 'check-your-deadline-item'
			},
			checkYourAnswers: {
				id: 'examination-check-your-answers',
				route: 'check-your-answers'
			},
			email: {
				id: 'examination-email',
				route: 'your-email-address'
			},
			enterComment: {
				id: 'examination-enter-comment',
				route: 'enter-a-comment',
				sessionId: 'comment'
			},
			evidenceOrComment: {
				id: 'examination-evidence-or-comment',
				route: 'select-upload-evidence-or-comment',
				sessionId: 'submissionType'
			},
			haveYourSay: {
				id: 'examination-have-your-say',
				name: 'Have your say during the Examination of the application',
				route: 'have-your-say-during-examination',
				view: 'pages/examination/have-your-say/have-your-say'
			},
			hasInterestedPartyNumber: {
				id: 'examination-has-interested-party-number',
				name: 'Do you have an interested party reference number?',
				route: 'have-an-interested-party-number',
				view: 'pages/examination/has-interested-party-number'
			},
			nameAgent: {
				id: 'examination-name',
				route: 'name-of-person-or-group'
			},
			nameMyself: {
				id: 'examination-name',
				route: 'your-name'
			},
			nameOrganisation: {
				id: 'examination-name',
				route: 'your-organisation-name'
			},
			personalInformation: {
				sessionId: 'personalInformation'
			},
			personalInformationComment: {
				id: 'examination-personal-information-comment',
				route: 'comment-has-personal-information-or-not'
			},
			personalInformationCommentFiles: {
				id: 'examination-personal-information-comment-files',
				route: 'comment-file-has-personal-information-or-not'
			},
			personalInformationFiles: {
				id: 'examination-personal-information-files',
				route: 'files-have-personal-information-or-not'
			},
			personalInformationWhichCommentFiles: {
				id: 'examination-personal-information-which-comment-files',
				route: 'select-which-files-comments-have-personal-information'
			},
			personalInformationWhichFiles: {
				id: 'examination-personal-information-which-files',
				route: 'which-files-have-personal-information-or-not'
			},
			selectDeadline: {
				id: 'examination-select-deadline',
				route: 'select-deadline-item',
				sessionId: {
					1: 'submissionId',
					2: 'submissionItem',
					3: 'submissionChecked'
				}
			},
			selectFile: {
				id: 'examination-select-file',
				route: 'select-a-file',
				sessionId: 'files'
			},
			submittingFor: {
				id: 'examination-submitting-for',
				route: 'who-are-you-submitting-for'
			},
			yourInterestedPartyNumber: {
				id: 'examination-your-interested-party-number',
				name: "What's your interested party reference number?",
				route: 'your-interested-party-number',
				view: 'pages/examination/your-interested-party-number'
			},
			addAnotherDeadlineItem: {
				id: 'examination-add-another-deadline-item',
				route: 'add-another-deadline-item',
				changeADeadlineItem: {
					route: 'change-a-deadline-item'
				}
			},
			selectIfYouWantToDeleteData: {
				id: 'examination-select-if-want-to-delete-data',
				route: 'select-if-want-to-delete-data',
				markDeadlineItemForDelete: {
					route: 'mark-deadline-item-to-delete'
				}
			},
			processSubmission: {
				id: 'examination-process-submission',
				route: 'process-submission'
			},
			submissionComplete: {
				route: 'submission-complete',
				view: 'pages/examination/submission-complete'
			},
			submissionError: {
				id: 'examination-submission-error',
				route: 'submission-error'
			}
		}
	},
	project: {
		directory: '/projects',
		subDirectory: '/:case_ref',
		pages: {
			documents: {
				id: 'project-documents',
				name: 'Documents',
				route: '/documents',
				view: 'projects/documents'
			},
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
