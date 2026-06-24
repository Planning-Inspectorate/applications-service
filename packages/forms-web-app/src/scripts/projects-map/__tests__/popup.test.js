jest.mock('ol-ext/src/overlay/Popup.js', () => {
	return jest.fn().mockImplementation(() => ({
		show: jest.fn(),
		hide: jest.fn()
	}));
});

const {
	renderPopupHTML,
	mapFeaturePropertiesToPopupProject,
	showProjectPopup
} = require('../popup');
const { NUM_ITERATIONS, randomProjects } = require('./test-helpers');
const boundariesNewSchema = require('./fixtures/boundaries-new-schema.json');

const popupText = {
	projectSelected: 'project selected',
	projectsSelected: 'projects selected'
};

describe('scripts/projects-map/popup', () => {
	describe('#mapFeaturePropertiesToPopupProject', () => {
		it('should use new schema keys', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseReference: 'EN010101',
				projectName: 'New Schema Project',
				stage: 'Examination'
			});

			expect(result).toEqual({
				caseReference: 'EN010101',
				projectName: 'New Schema Project',
				stage: 'Examination'
			});
		});

		it('should ignore legacy keys when only legacy keys are provided', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseRef: 'EN010102',
				projName: 'Legacy Project',
				geomStage: 'Pre-application'
			});

			expect(result).toEqual({
				caseReference: undefined,
				projectName: 'Unknown project',
				stage: ''
			});
		});

		it('should provide safe fallback values for mixed and missing fields', () => {
			const result = mapFeaturePropertiesToPopupProject({
				caseReference: 'EN010103',
				projectName: '   ',
				stage: 'Accepted'
			});

			expect(result).toEqual({
				caseReference: 'EN010103',
				projectName: 'EN010103',
				stage: 'Accepted'
			});
		});

		it('should use Unknown project when both projectName and caseReference are missing', () => {
			const result = mapFeaturePropertiesToPopupProject({
				projectName: ''
			});

			expect(result).toEqual({
				caseReference: undefined,
				projectName: 'Unknown project',
				stage: ''
			});
		});
	});

	describe('#renderPopupHTML', () => {
		describe('single project', () => {
			it('should contain the project name, case reference and stage', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Example Wind Farm');
				expect(html).toContain('EN010001');
				expect(html).toContain('Examination');
			});

			it('should include a link to /projects/{caseReference}', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('href="/projects/EN010001"');
			});

			it('should display "1 project selected" header', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('1 project selected');
			});
		});

		describe('multiple projects', () => {
			const projects = [
				{
					caseReference: 'EN010001',
					projectName: 'Example Wind Farm',
					stage: 'Examination'
				},
				{
					caseReference: 'EN010002',
					projectName: 'Solar Array Project',
					stage: 'Pre-application'
				},
				{
					caseReference: 'EN010003',
					projectName: 'Rail Link Extension',
					stage: 'Accepted'
				}
			];

			it('should contain all project names, case references, and stages', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Example Wind Farm');
				expect(html).toContain('EN010001');
				expect(html).toContain('Examination');

				expect(html).toContain('Solar Array Project');
				expect(html).toContain('EN010002');
				expect(html).toContain('Pre-application');

				expect(html).toContain('Rail Link Extension');
				expect(html).toContain('EN010003');
				expect(html).toContain('Accepted');
			});

			it('should include links to /projects/{caseReference} for each project', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('href="/projects/EN010001"');
				expect(html).toContain('href="/projects/EN010002"');
				expect(html).toContain('href="/projects/EN010003"');
			});

			it('should display "3 projects selected" header', () => {
				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('3 projects selected');
			});
		});

		describe('edge cases', () => {
			it('should use caseReference as link text when projectName is missing', () => {
				const projects = [
					{
						caseReference: 'EN010004',
						projectName: '',
						stage: 'Draft'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('>EN010004</a>');
				expect(html).toContain('href="/projects/EN010004"');
			});

			it('should render empty stage cell when stage is missing', () => {
				const projects = [
					{
						caseReference: 'EN010005',
						projectName: 'No Stage Project',
						stage: ''
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('No Stage Project');
				expect(html).toContain('cluster-popup-cell-stage');
			});

			it('should not render undefined when caseReference and projectName are missing', () => {
				const projects = [
					{
						caseReference: undefined,
						projectName: undefined,
						stage: 'Accepted'
					}
				];

				const html = renderPopupHTML(projects, popupText);

				expect(html).toContain('Unknown project');
				expect(html).not.toContain('undefined');
				expect(html).not.toContain('href="/projects/undefined"');
			});
		});
	});

	describe('#showProjectPopup', () => {
		it('should render boundary popup text from new schema feature properties without undefined', () => {
			const popup = { show: jest.fn(), hide: jest.fn() };
			const features = [
				{
					getProperties: () => ({
						caseReference: 'EN010201',
						projectName: 'Boundary Wind Farm',
						receivedDate: '2026-06-01'
					})
				}
			];

			showProjectPopup(popup, features, [0, 0], popupText);

			expect(popup.show).toHaveBeenCalledTimes(1);
			const html = popup.show.mock.calls[0][1];
			expect(html).toContain('Boundary Wind Farm');
			expect(html).toContain('href="/projects/EN010201"');
			expect(html).not.toContain('undefined');
		});

		it('should render popup rows correctly for provided boundary GeoJSON fixture', () => {
			const popup = { show: jest.fn(), hide: jest.fn() };
			const features = boundariesNewSchema.features.map((feature) => ({
				getProperties: () => feature.properties
			}));

			showProjectPopup(popup, features, [100, 200], popupText);

			expect(popup.show).toHaveBeenCalledTimes(1);
			const html = popup.show.mock.calls[0][1];
			expect(html).toContain('5 projects selected');
			expect(html).toContain('Northvale Solar Farm');
			expect(html).toContain('East Haven Wind Extension');
			expect(html).toContain('Southport Grid Connection');
			expect(html).toContain('Riverside Port Upgrade');
			expect(html).toContain('Westmoor Hydrogen Facility');
			expect(html).toContain('href="/projects/EN010201"');
			expect(html).toContain('href="/projects/EN010205"');
			expect(html).not.toContain('undefined');
		});
	});

	describe('Popup HTML rendering - property-based', () => {
		it('should contain every project caseReference in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.caseReference);
				}
			}
		});

		it('should contain every project projectName in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.projectName);
				}
			}
		});

		it('should contain every project stage in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(project.stage);
				}
			}
		});

		it('should include a link to /projects/{caseReference} for every project', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects, popupText);
				for (const project of projects) {
					expect(html).toContain(`href="/projects/${project.caseReference}"`);
				}
			}
		});
	});
});
