jest.mock('ol-ext/src/overlay/Popup.js', () => {
	return jest.fn().mockImplementation(() => ({
		show: jest.fn(),
		hide: jest.fn()
	}));
});

const { renderPopupHTML } = require('../popup');
const { NUM_ITERATIONS, randomProjects } = require('./test-helpers');

const NUM_ITERATIONS = 100;

function randomString(minLen = 1, maxLen = 20) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
	const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
	let result = '';
	for (let i = 0; i < len; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

function randomProject() {
	return {
		caseReference: randomString(5, 12),
		projectName: randomString(3, 30),
		stage: randomString(3, 15)
	};
}

function randomProjects(minCount = 1, maxCount = 10) {
	const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
	return Array.from({ length: count }, randomProject);
}

describe('scripts/projects-map/popup', () => {
	describe('#renderPopupHTML', () => {
		describe('single project', () => {
			it('should contain the project name, case reference, and stage', () => {
				const projects = [
					{
						caseReference: 'EN010001',
						projectName: 'Example Wind Farm',
						stage: 'Examination'
					}
				];

				const html = renderPopupHTML(projects);

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

				const html = renderPopupHTML(projects);

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

				const html = renderPopupHTML(projects);

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
				const html = renderPopupHTML(projects);

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
				const html = renderPopupHTML(projects);

				expect(html).toContain('href="/projects/EN010001"');
				expect(html).toContain('href="/projects/EN010002"');
				expect(html).toContain('href="/projects/EN010003"');
			});

			it('should display "3 projects selected" header', () => {
				const html = renderPopupHTML(projects);

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

				const html = renderPopupHTML(projects);

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

				const html = renderPopupHTML(projects);

				expect(html).toContain('No Stage Project');
				expect(html).toContain('cluster-popup-cell-stage');
			});
		});
	});

	describe('Popup HTML rendering - property-based', () => {
		it('should contain every project caseReference in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects);
				for (const project of projects) {
					expect(html).toContain(project.caseReference);
				}
			}
		});

		it('should contain every project projectName in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects);
				for (const project of projects) {
					expect(html).toContain(project.projectName);
				}
			}
		});

		it('should contain every project stage in the output HTML', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects);
				for (const project of projects) {
					expect(html).toContain(project.stage);
				}
			}
		});

		it('should include a link to /projects/{caseReference} for every project', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const projects = randomProjects();
				const html = renderPopupHTML(projects);
				for (const project of projects) {
					expect(html).toContain(`href="/projects/${project.caseReference}"`);
				}
			}
		});
	});
});
