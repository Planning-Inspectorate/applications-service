const { getVerticalTabs } = require('./get-vertical-tabs');
const { featureHideLink, featureFlag } = require('../../../../config');

jest.mock('../../../../config', () => ({
	featureFlag: {},
	featureHideLink: {}
}));
describe('#getVerticalTabs', () => {
	describe('When getting the vertical tabs for the projects layout', () => {
		describe('and not feature flags are set', () => {
			let result;
			beforeEach(() => {
				featureFlag.allowProjectInformation = false;
				featureFlag.hideProjectTimelineLink = false;
				featureFlag.allowDocumentLibrary = false;
				featureFlag.allowExaminationTimetable = false;
				featureHideLink.hideAllExaminationDocumentsLink = true;
				featureFlag.allowSection51 = false;
				featureFlag.allowHaveYourSay = false;
				result = getVerticalTabs('mock case ref', true, true);
			});

			it('should return the vertical tabs', () => {
				expect(result).toEqual([
					{
						hidden: true,
						id: 'project-information',
						name: 'Project information',
						url: '/projects/mock case ref'
					},
					{
						hidden: true,
						id: 'project-timeline',
						name: 'Project timeline',
						url: '/projects/project-timeline'
					},
					{
						hidden: true,
						id: 'project-documents',
						name: 'Documents',
						url: '/projects/mock case ref/documents'
					},
					{
						hidden: false,
						id: 'representations',
						name: 'Relevant representations (Registration comments)',
						url: '/projects/mock case ref/representations'
					},
					{
						hidden: true,
						id: 'project-examination-timetable',
						name: 'Examination timetable',
						url: '/projects/mock case ref/examination-timetable'
					},
					{
						hidden: true,
						id: 'project-have-your-say',
						name: 'Have your say',
						url: '/projects/mock case ref/examination/have-your-say-during-examination'
					},
					{
						hidden: true,
						id: 'get-updates',
						name: 'Get updates',
						url: '/projects/mock case ref/get-updates/start'
					},
					{
						hidden: true,
						id: 'all-examination-documents',
						name: 'All Examination documents',
						url: '/projects/all-examination-documents'
					},
					{
						hidden: true,
						id: 'section-51',
						name: 'Section 51 advice',
						url: '/projects/mock case ref/s51advice'
					}
				]);
			});
		});
		describe('and feature flags are set', () => {
			beforeEach(() => {
				featureFlag.allowProjectInformation = true;
				featureFlag.hideProjectTimelineLink = true;
				featureFlag.allowDocumentLibrary = true;
				featureFlag.allowExaminationTimetable = true;
				featureHideLink.hideAllExaminationDocumentsLink = false;
				featureFlag.allowSection51 = true;
				featureFlag.allowHaveYourSay = true;
				featureFlag.allowGetUpdates = true;
				featureFlag.projectMigrationCaseReferences = ['mock case ref'];
			});

			describe('and case id is in the projectMigrationCaseReferences', () => {
				it('should return the vertical tabs', () => {
					const result = getVerticalTabs('mock case ref', false, false);
					expect(result).toEqual([
						{
							hidden: false,
							id: 'project-information',
							name: 'Project information',
							url: '/projects/mock case ref'
						},
						{
							hidden: false,
							id: 'project-timeline',
							name: 'Project timeline',
							url: '/projects/project-timeline'
						},
						{
							hidden: false,
							id: 'project-documents',
							name: 'Documents',
							url: '/projects/mock case ref/documents'
						},
						{
							hidden: false,
							id: 'representations',
							name: 'Relevant representations (Registration comments)',
							url: '/projects/mock case ref/representations'
						},
						{
							hidden: true,
							id: 'project-examination-timetable',
							name: 'Examination timetable',
							url: '/projects/mock case ref/examination-timetable'
						},
						{
							hidden: true,
							id: 'project-have-your-say',
							name: 'Have your say',
							url: '/projects/mock case ref/examination/have-your-say-during-examination'
						},
						{
							hidden: false,
							id: 'get-updates',
							name: 'Get updates',
							url: '/projects/mock case ref/get-updates/start'
						},
						{
							hidden: false,
							id: 'all-examination-documents',
							name: 'All Examination documents',
							url: '/projects/all-examination-documents'
						},
						{
							hidden: false,
							id: 'section-51',
							name: 'Section 51 advice',
							url: '/projects/mock case ref/s51advice'
						}
					]);
				});
			});

			describe('and case id is not in the projectMigrationCaseReferences', () => {
				it('should return the vertical tabs excluding "get-updates" and "project-information', () => {
					const result = getVerticalTabs('migrated-case-ref', false, false);
					expect(result).toEqual([
						{
							hidden: true,
							id: 'project-information',
							name: 'Project information',
							url: '/projects/migrated-case-ref'
						},
						{
							hidden: false,
							id: 'project-timeline',
							name: 'Project timeline',
							url: '/projects/project-timeline'
						},
						{
							hidden: false,
							id: 'project-documents',
							name: 'Documents',
							url: '/projects/migrated-case-ref/documents'
						},
						{
							hidden: false,
							id: 'representations',
							name: 'Relevant representations (Registration comments)',
							url: '/projects/migrated-case-ref/representations'
						},
						{
							hidden: true,
							id: 'project-examination-timetable',
							name: 'Examination timetable',
							url: '/projects/migrated-case-ref/examination-timetable'
						},
						{
							hidden: true,
							id: 'project-have-your-say',
							name: 'Have your say',
							url: '/projects/migrated-case-ref/examination/have-your-say-during-examination'
						},
						{
							hidden: true,
							id: 'get-updates',
							name: 'Get updates',
							url: '/projects/migrated-case-ref/get-updates/start'
						},
						{
							hidden: false,
							id: 'all-examination-documents',
							name: 'All Examination documents',
							url: '/projects/all-examination-documents'
						},
						{
							hidden: false,
							id: 'section-51',
							name: 'Section 51 advice',
							url: '/projects/migrated-case-ref/s51advice'
						}
					]);
				});
			});
		});
	});
});
