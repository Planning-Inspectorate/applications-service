const { featureHideLink, featureFlag } = require('../../../../config');
const { isRegistrationOpen } = require('../../register/index/_utils/is-registration-open');
const { registerRoute } = require('../../register/index/config');

function getVerticalTabs(
	caseRef,
	hasOpenTimetables,
	eventsEligibleForDisplay,
	{ DateOfRepresentationPeriodOpen, DateOfRelevantRepresentationClose }
) {
	return [
		{
			hidden:
				featureFlag.allowProjectInformation != true ||
				!featureFlag.projectMigrationCaseReferences.includes(caseRef),
			id: 'project-information',
			name: 'Project information',
			url: '/projects/' + caseRef
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
			hidden: !isRegistrationOpen(
				DateOfRepresentationPeriodOpen,
				DateOfRelevantRepresentationClose
			),
			id: 'register-index',
			name: 'Register to have your say',
			url: `/projects/${caseRef}/register/${registerRoute}`
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
			hidden:
				featureFlag.allowGetUpdates != true ||
				!featureFlag.projectMigrationCaseReferences.includes(caseRef),
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
