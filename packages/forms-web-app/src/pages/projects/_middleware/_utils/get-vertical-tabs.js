const { featureHideLink, featureFlag } = require('../../../../config');
const { getProjectsDocumentsURL } = require('../../documents/_utils/get-projects-documents-url');
const { getProjectsIndexURL } = require('../../index/_utils/get-projects-index-url');
const {
	getRepresentationsIndexURL
} = require('../../representations/index/_utils/get-representations-index-url');
const { getSection51IndexURL } = require('../../section-51/index/_utils/get-section-51-index-url');
const {
	getProjectsExaminationTimetableURL
} = require('../../examination-timetable/_utils/get-projects-examination-timetable-url');
const { getRegisterIndexURL } = require('../../register/index/_utils/get-register-index-url');
const { getUpdatesIndexURL } = require('../../get-updates/index/utils/get-updates-index-url');
const { isRegistrationOpen } = require('../../register/index/_utils/is-registration-open');

function getVerticalTabs(caseRef, applicationData, showExaminationLink, showRepresentationsLink) {
	return [
		{
			hidden:
				featureFlag.allowProjectInformation != true ||
				!featureFlag.projectMigrationCaseReferences.includes(caseRef),
			id: 'project-information',
			name: 'Project information',
			url: getProjectsIndexURL(caseRef)
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
			url: getProjectsDocumentsURL(caseRef)
		},
		{
			hidden: !isRegistrationOpen(applicationData),
			id: 'register-index',
			name: 'Register to have your say',
			url: getRegisterIndexURL(caseRef)
		},
		{
			hidden: !showRepresentationsLink,
			id: 'representations',
			name: 'Relevant representations (registration comments)',
			url: getRepresentationsIndexURL(caseRef)
		},
		{
			hidden: featureFlag.allowExaminationTimetable != true || !showExaminationLink,
			id: 'project-examination-timetable',
			name: 'Examination timetable',
			url: getProjectsExaminationTimetableURL(caseRef)
		},
		{
			hidden: featureFlag.allowHaveYourSay != true || !showExaminationLink,
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
			url: getUpdatesIndexURL(caseRef)
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
			url: getSection51IndexURL(caseRef)
		}
	];
}

module.exports = {
	getVerticalTabs
};
