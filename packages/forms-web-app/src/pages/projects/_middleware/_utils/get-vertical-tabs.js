const { featureHideLink, featureFlag } = require('../../../../config');

function getVerticalTabs(projectName, caseRef, hasOpenTimetables, eventsEligibleForDisplay) {
	return [
		{
			hidden: featureHideLink.hideProjectInformationLink,
			id: 'examination',
			name: '' + projectName + ' project information',
			url: '/projects/' + caseRef + ''
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
			name: 'Relevant Representations (Registration comments)',
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
