const { featureHideLink, featureFlag } = require('../../../../config');

function getVerticalTabs(projectName, caseRef, hasOpenTimetables, eventsEligibleForDisplay) {
	return [
		{
<<<<<<< HEAD
			hidden: featureFlag.allowProjectInformation != true,
			id: 'examination',
			name: '' + projectName + ' project information',
			url: '/projects/' + caseRef + ''
=======
			hidden: featureHideLink.hideProjectInformationLink,
			id: 'project-information',
			name: 'Project information',
			url: '/projects/' + caseRef
>>>>>>> 9924e3f2 (feat(projects): first stage of new projects information page)
		},
		{
			hidden: featureFlag.hideProjectTimelineLink != true,
			id: 'project-timeline',
			name: 'Project timeline',
			url: '/projects/project-timeline'
		},
		{
			hidden: featureFlag.allowDocumentLibrary != true,
			id: 'project-documents',
			name: 'Documents',
			url: '/projects/' + caseRef + '/documents'
		},
		{
			hidden: false,
			id: 'representations',
			name: 'Relevant representations (Registration comments)',
			url: '/projects/' + caseRef + '/representations'
		},
		{
			hidden: featureFlag.allowExaminationTimetable != true || !eventsEligibleForDisplay,
			id: 'project-examination-timetable',
			name: 'Examination timetable',
			url: '/projects/' + caseRef + '/examination-timetable'
		},
		{
			hidden: featureFlag.allowHaveYourSay != true || !hasOpenTimetables,
			id: 'project-have-your-say',
			name: 'Have your say',
			url: '/projects/' + caseRef + '/examination/have-your-say-during-examination'
		},
		{
			hidden: featureFlag.allowGetUpdates != true,
			id: 'get-updates',
			name: 'Get updates',
			url: '/projects/' + caseRef + '/get-updates/start'
		},
		{
			hidden: featureHideLink.hideAllExaminationDocumentsLink,
			id: 'all-examination-documents',
			name: 'All Examination documents',
			url: '/projects/all-examination-documents'
		},
		{
			hidden: featureFlag.allowSection51 != true,
			id: 'section-51',
			name: 'Section 51 advice',
			url: '/projects/' + caseRef + '/s51advice'
		}
	];
}

module.exports = {
	getVerticalTabs
};
