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

function getVerticalTabs(
	i18n,
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
			name: i18n.t('common:verticalTabs.projectInformation'),
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
			name: i18n.t('common:verticalTabs.documents'),
			url: getProjectsDocumentsURL(caseRef)
		},
		{
			hidden: !isRegistrationOpen(
				DateOfRepresentationPeriodOpen,
				DateOfRelevantRepresentationClose
			),
			id: 'register-index',
			name: i18n.t('common:verticalTabs.register'),
			url: getRegisterIndexURL(caseRef)
		},
		{
			hidden: false,
			id: 'representations',
			name: i18n.t('common:verticalTabs.relevantRepresentations'),
			url: getRepresentationsIndexURL(caseRef)
		},
		{
			hidden: featureFlag.allowExaminationTimetable != true || !eventsEligibleForDisplay,
			id: 'project-examination-timetable',
			name: i18n.t('common:verticalTabs.examinationTimetable'),
			url: getProjectsExaminationTimetableURL(caseRef)
		},
		{
			hidden: featureFlag.allowHaveYourSay != true || !hasOpenTimetables,
			id: 'project-have-your-say',
			name: i18n.t('common:verticalTabs.haveYourSay'),
			url: '/projects/' + caseRef + '/examination/have-your-say-during-examination'
		},
		{
			hidden:
				featureFlag.allowGetUpdates != true ||
				!featureFlag.projectMigrationCaseReferences.includes(caseRef),
			id: 'get-updates',
			name: i18n.t('common:verticalTabs.getUpdates'),
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
			name: i18n.t('common:verticalTabs.section51'),
			url: getSection51IndexURL(caseRef)
		}
	];
}

module.exports = {
	getVerticalTabs
};
