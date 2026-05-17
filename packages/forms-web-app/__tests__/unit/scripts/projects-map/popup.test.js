'use strict';

jest.mock('ol-ext/src/overlay/Popup.js', () => ({ __esModule: true, default: jest.fn() }));

const { buildPopup, renderPopup } = require('../../../../src/scripts/projects-map/popup');
const Popup = require('ol-ext/src/overlay/Popup.js').default;

// ─── helpers ─────────────────────────────────────────────────────────────────

function makePopupInstance() {
	return { show: jest.fn(), hide: jest.fn() };
}

function makeFeature(caseReference, projectName, stage) {
	return { getProperties: () => ({ caseReference, projectName, stage }) };
}

// ─── buildPopup ──────────────────────────────────────────────────────────────

describe('buildPopup', () => {
	it('instantiates Popup with the expected configuration', () => {
		buildPopup();
		expect(Popup).toHaveBeenCalledWith({
			popupClass: 'default',
			closeBox: true,
			positioning: 'auto',
			autoPan: { animation: { duration: 250 } }
		});
	});

	it('returns the Popup instance', () => {
		const instance = {};
		Popup.mockImplementation(() => instance);
		expect(buildPopup()).toBe(instance);
	});
});

// ─── renderPopup ─────────────────────────────────────────────────────────────

describe('renderPopup', () => {
	it('calls popup.show with the provided coordinate', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('ABC-001', 'Project A', 'Pre-application')], [100, 200]);
		expect(popup.show).toHaveBeenCalledWith([100, 200], expect.any(String));
	});

	it('renders a singular heading for one project', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('A', 'PA', '')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('1 project selected');
	});

	it('renders a plural heading for multiple projects', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('A', 'PA', ''), makeFeature('B', 'PB', '')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('2 projects selected');
	});

	it('renders a link to the project using caseReference in the href', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('EN010001', 'Hinkley Point C', 'Examination')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('href="/projects/EN010001"');
	});

	it('uses projectName as the link text when available', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('EN010001', 'Hinkley Point C', 'Examination')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('>Hinkley Point C<');
	});

	it('falls back to caseReference as the link text when projectName is absent', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('EN010001', undefined, '')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('>EN010001<');
	});

	it('renders the stage value in the stage cell', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('A', 'PA', 'Decision')], [0, 0]);
		expect(popup.show.mock.calls[0][1]).toContain('Decision');
	});

	it('renders an empty stage cell when stage is absent', () => {
		const popup = makePopupInstance();
		renderPopup(popup, [makeFeature('A', 'PA', undefined)], [0, 0]);
		const html = popup.show.mock.calls[0][1];
		expect(html).toContain('cluster-popup-cell-stage');
	});

	it('renders one table row per feature', () => {
		const popup = makePopupInstance();
		renderPopup(
			popup,
			[makeFeature('A', 'PA', ''), makeFeature('B', 'PB', ''), makeFeature('C', 'PC', '')],
			[0, 0]
		);
		const html = popup.show.mock.calls[0][1];
		expect((html.match(/cluster-popup-row/g) || []).length).toBe(3);
	});
});
