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
	applicationData,
	showExaminationLink,
	showRepresentationsLink
) {
	return [
		{
			hidden: featureFlag.allowProjectInformation != true,
			id: 'project-information',
			name: i18n.t('projects.navigation.index'),
			url: getProjectsIndexURL(caseRef)
		},
		{
			hidden: featureFlag.hideProjectTimelineLink != true,
			id: 'project-timeline',
			name: 'Project timeline',
			url: '/projects/project-timeline'
		},
		{
			hidden: false,
			id: 'project-documents',
			name: i18n.t('projects.navigation.documents'),
			url: getProjectsDocumentsURL(caseRef)
		},
		{
			hidden: !isRegistrationOpen(applicationData),
			id: 'register-index',
			name: i18n.t('projects.navigation.register'),
			url: getRegisterIndexURL(caseRef)
		},
		{
			hidden: !showRepresentationsLink,
			id: 'representations',
			name: i18n.t('projects.navigation.representations'),
			url: getRepresentationsIndexURL(caseRef)
		},
		{
			hidden: !showExaminationLink,
			id: 'project-examination-timetable',
			name: i18n.t('projects.navigation.examinationTimetable'),
			url: getProjectsExaminationTimetableURL(caseRef)
		},
		{
			hidden: !showExaminationLink,
			id: 'project-have-your-say',
			name: i18n.t('projects.navigation.haveYourSay'),
			url: '/projects/' + caseRef + '/examination/have-your-say-during-examination'
		},
		{
			hidden: false,
			id: 'get-updates',
			name: i18n.t('projects.navigation.getUpdates'),
			url: getUpdatesIndexURL(caseRef)
		},
		{
			hidden: featureHideLink.hideAllExaminationDocumentsLink,
			id: 'all-examination-documents',
			name: 'All Examination documents',
			url: '/projects/all-examination-documents'
		},
		{
			hidden: false,
			id: 'section-51',
			name: i18n.t('projects.navigation.section51'),
			url: getSection51IndexURL(caseRef)
		}
	];
}

module.exports = {
	getVerticalTabs
};
