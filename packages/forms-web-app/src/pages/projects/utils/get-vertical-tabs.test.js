const { getVerticalTabs } = require('./get-vertical-tabs');
const { featureHideLink, featureFlag } = require('../../../config');

jest.mock('../../../config', () => ({
	featureFlag: {},
	featureHideLink: {}
}));
describe('#getVerticalTabs', () => {
	describe('When getting the vertical tabs for the projects layout', () => {
		describe('and not feature flags are set', () => {
			let result;
			beforeEach(() => {
				featureHideLink.hideProjectInformationLink = true;
				featureFlag.hideProjectTimelineLink = false;
				featureFlag.allowDocumentLibrary = false;
				featureFlag.allowExaminationTimetable = false;
				featureHideLink.hideAllExaminationDocumentsLink = true;
				featureFlag.allowSection51 = false;
				result = getVerticalTabs('mock project name', 'mock case ref');
			});

			it('should return the vertical tabs', () => {
				expect(result).toEqual([
					{
						hidden: true,
						id: 'examination',
						name: 'mock project name project information',
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
						name: 'Relevant Representations (Registration comments)',
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
			let result;
			beforeEach(() => {
				featureHideLink.hideProjectInformationLink = false;
				featureFlag.hideProjectTimelineLink = true;
				featureFlag.allowDocumentLibrary = true;
				featureFlag.allowExaminationTimetable = true;
				featureHideLink.hideAllExaminationDocumentsLink = false;
				featureFlag.allowSection51 = true;
				result = getVerticalTabs('mock project name', 'mock case ref');
			});

			it('should return the vertical tabs', () => {
				expect(result).toEqual([
					{
						hidden: false,
						id: 'examination',
						name: 'mock project name project information',
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
						name: 'Relevant Representations (Registration comments)',
						url: '/projects/mock case ref/representations'
					},
					{
						hidden: false,
						id: 'project-examination-timetable',
						name: 'Examination timetable',
						url: '/projects/mock case ref/examination-timetable'
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
	});
});
