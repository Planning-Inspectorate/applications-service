jest.mock('ol-ext/src/overlay/Popup.js', () => {
	return jest.fn().mockImplementation(() => ({
		show: jest.fn(),
		hide: jest.fn()
	}));
});

const { renderPopupHTML } = require('../popup');

/**
 * Property 2: Popup HTML rendering contains all required project information
 * Validates: Requirements 1.6, 2.4
 *
 * For any array of project objects (each with caseReference, projectName, and stage properties),
 * the renderPopupHTML function SHALL produce an HTML string that contains every project's
 * caseReference, projectName, stage value, and includes a link to /projects/{caseReference}.
 */

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

describe('Property: Popup HTML rendering contains all required project information', () => {
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
