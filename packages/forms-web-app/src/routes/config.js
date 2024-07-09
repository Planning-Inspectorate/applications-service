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
				route: 'are-you-applicant',
				title: 'Are you #?',
				view: 'pages/examination/applicant'
			},
			checkSubmissionItem: {
				id: 'examination-check-submission-item',
				name: 'Check your answers',
				route: 'check-your-deadline-item',
				view: 'pages/examination/check-submission-item'
			},
			checkYourAnswers: {
				id: 'examination-check-your-answers',
				name: 'Check your answers',
				route: 'check-your-answers',
				view: 'pages/examination/check-your-answers'
			},
			email: {
				id: 'examination-email',
				name: `What's your email address?`,
				route: 'your-email-address',
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
				onError: {
					message: {
						checkLength: 'Your comment must be 65,234 characters or less',
						notEmpty: 'Enter a comment'
					},
					minMaxOptions: {
						min: 1,
						max: 65234
					}
				},
				route: 'enter-a-comment',
				sessionId: 'comment',
				title: 'Make a comment',
				view: 'pages/examination/enter-comment'
			},
			evidenceOrComment: {
				id: 'examination-evidence-or-comment',
				onError: {
					message: {
						isEmpty: 'Select if you want to upload supporting evidence or write a comment'
					}
				},
				options: {
					1: {
						value: 'comment',
						text: 'Make a comment'
					},
					2: {
						value: 'upload',
						text: 'Upload files'
					},
					3: {
						value: 'both',
						text: 'Make a comment and upload files'
					}
				},
				route: 'select-upload-evidence-or-comment',
				sessionId: 'submissionType',
				title: 'How would you like to submit comments?',
				view: 'pages/examination/evidence-or-comment'
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
				name: 'Name of person or group',
				title: "What's the full name of the person, household or organisation?",
				pageTitle: "What's the full name of the person, household or organisation?",
				onError: {
					message: {
						checkLength:
							"The full name of the person, household or organisation organisation's name must be between 1 and 255 characters",
						notEmpty: 'Enter the full name of the person, household or organisation'
					},
					minMaxOptions: {
						min: 1,
						max: 255
					}
				},
				route: 'name-of-person-or-group',
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
				route: 'your-name',
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
				route: 'your-organisation-name',
				view: 'pages/examination/name'
			},
			personalInformation: {
				name: 'Personal information',
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
				sessionId: 'personalInformation',
				view: 'pages/examination/personal-information'
			},
			personalInformationComment: {
				id: 'examination-personal-information-comment',
				name: '',
				onError: {
					message: {
						isEmpty: 'Select yes if your submission contains personal information'
					}
				},
				pageTitle: 'Submission has personal information or not',
				route: 'comment-has-personal-information-or-not',
				title: 'Does your submission contain personal information?'
			},
			personalInformationCommentFiles: {
				id: 'examination-personal-information-comment-files',
				onError: {
					message: {
						isEmpty: 'Select yes if your submission contains personal information'
					}
				},
				pageTitle: 'Submission has personal information or not',
				route: 'comment-file-has-personal-information-or-not',
				title: 'Does your submission contain personal information?'
			},
			personalInformationFiles: {
				id: 'examination-personal-information-files',
				onError: {
					message: {
						isEmpty: 'Select yes if your submission contains personal information'
					}
				},
				pageTitle: 'Submission has personal information or not',
				route: 'files-have-personal-information-or-not',
				title: 'Does your submission contain personal information?'
			},
			personalInformationWhich: {
				view: 'pages/examination/personal-information-which'
			},
			personalInformationWhichCommentFiles: {
				id: 'examination-personal-information-which-comment-files',
				name: 'Which files and comments contain personal information?',
				route: 'select-which-files-comments-have-personal-information',
				onError: {
					message: {
						isEmpty: 'Select files and comments that contain personal information'
					}
				}
			},
			personalInformationWhichFiles: {
				id: 'examination-personal-information-which-files',
				name: 'Which files contain personal information?',
				route: 'which-files-have-personal-information-or-not',
				onError: {
					message: {
						isEmpty: 'Select files that contain personal information'
					}
				}
			},
			selectDeadline: {
				id: 'examination-select-deadline',
				name: 'Deadline item',
				onError: {
					message: {
						isEmpty: 'Select an item'
					}
				},
				route: 'select-deadline-item',
				sessionId: {
					1: 'submissionId',
					2: 'submissionItem',
					3: 'submissionChecked'
				},
				title: 'Which item would you like to submit against for this deadline?',
				view: 'pages/examination/select-deadline'
			},
			selectFile: {
				id: 'examination-select-file',
				name: 'Select a file',
				route: 'select-a-file',
				view: 'pages/examination/select-file',
				sessionId: 'files',
				onError: {
					message: {
						isEmpty: (fileToUploadName = '') => `${fileToUploadName} is empty`,
						noFileSelected: 'Select a File',
						checkMimeType: (fileToUploadName = '') =>
							`${fileToUploadName} must be a JPG, BMP, PNG, TIF, TIFF, DOC, JPEG, XLS, XSLX or PDF.`,
						maxSize: (fileToUploadName = '', size) =>
							`${fileToUploadName} must be smaller than ${size}mb.`,
						moreThanXFiles: (limit) =>
							`You can only select a total of ${limit}  files per submission`
					}
				}
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
				name: 'You added one deadline item',
				title: 'You added one deadline item',
				pageTitle: 'You added one deadline item',
				route: 'add-another-deadline-item',
				view: 'pages/examination/add-another-deadline-item',
				comment: '',
				changeADeadlineItem: {
					route: 'change-a-deadline-item'
				},
				onError: {
					message: {
						isEmpty: 'Select yes if you want to add another deadline item'
					}
				}
			},
			selectIfYouWantToDeleteData: {
				id: 'examination-select-if-want-to-delete-data',
				pageTitle: 'Are you sure you want to delete data for this item?',
				route: 'select-if-want-to-delete-data',
				markDeadlineItemForDelete: {
					route: 'mark-deadline-item-to-delete'
				},
				view: 'pages/examination/select-if-want-to-delete-data',
				onError: {
					message: {
						isEmpty: 'Select yes if you need to delete data for this item'
					}
				}
			},
			processSubmission: {
				id: 'examination-process-submission',
				pageTitle: 'Process submission',
				route: 'process-submission',
				view: 'pages/examination/process-submission'
			},
			submissionComplete: {
				route: 'submission-complete',
				view: 'pages/examination/submission-complete'
			},
			submissionError: {
				id: 'examination-submission-error',
				route: 'submission-error',
				view: 'error/examination-submission-error'
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
