/**
 * @jest-environment jsdom
 *
 * @fileoverview Unit tests for {@link module:scripts/projects-map/get-controls}.
 *
 * `getControls` builds the OL control collection passed to `new Map({ controls })`.
 * Key design decisions verified here:
 *   - OL's built-in Attribution control is disabled because the OS Maps branding
 *     script (`os-api-branding`) renders attribution instead.
 *   - The zoom-in / zoom-out button labels use GOV.UK-accessible markup: a
 *     visible symbol wrapped in `aria-hidden` plus a `.govuk-visually-hidden`
 *     screen-reader label.
 *
 * jsdom is required so `document.createElement` works inside `getControls`.
 */
'use strict';

const mockControlsCollection = {};
jest.mock('ol/control/defaults.js', () => ({ defaults: jest.fn() }));

const { defaults } = require('ol/control/defaults.js');
const {
	getControls,
	updateZoomButtons
} = require('../../../../src/scripts/projects-map/get-controls');

beforeEach(() => {
	defaults.mockReturnValue(mockControlsCollection);
});

describe('getControls', () => {
	it('calls defaults with attribution disabled', () => {
		getControls();
		expect(defaults).toHaveBeenCalledWith(expect.objectContaining({ attribution: false }));
	});

	it('passes zoom-in label as a DOM element with accessible text', () => {
		getControls();
		const { zoomOptions } = defaults.mock.calls[0][0];
		expect(zoomOptions.zoomInLabel.querySelector('[aria-hidden="true"]').textContent).toBe('+');
		expect(zoomOptions.zoomInLabel.querySelector('.govuk-visually-hidden').textContent).toBe(
			'Zoom in'
		);
	});

	it('passes zoom-out label as a DOM element with accessible text', () => {
		getControls();
		const { zoomOptions } = defaults.mock.calls[0][0];
		expect(zoomOptions.zoomOutLabel.querySelector('[aria-hidden="true"]').textContent).toBe('−');
		expect(zoomOptions.zoomOutLabel.querySelector('.govuk-visually-hidden').textContent).toBe(
			'Zoom out'
		);
	});

	it('returns the controls collection produced by defaults()', () => {
		expect(getControls()).toBe(mockControlsCollection);
	});
});

describe('updateZoomButtons', () => {
	let mockMap;
	let mockView;
	let zoomInBtn;
	let zoomOutBtn;

	beforeEach(() => {
		zoomInBtn = document.createElement('button');
		zoomInBtn.className = 'ol-zoom-in';

		zoomOutBtn = document.createElement('button');
		zoomOutBtn.className = 'ol-zoom-out';

		const targetElement = document.createElement('div');
		targetElement.appendChild(zoomInBtn);
		targetElement.appendChild(zoomOutBtn);

		mockView = {
			getZoom: jest.fn(),
			getMaxZoom: jest.fn().mockReturnValue(9),
			getMinZoom: jest.fn().mockReturnValue(0)
		};

		mockMap = {
			getView: jest.fn().mockReturnValue(mockView),
			getTargetElement: jest.fn().mockReturnValue(targetElement)
		};
	});

	it('adds no-zoom class to zoom-in button if at max zoom', () => {
		mockView.getZoom.mockReturnValue(9);
		updateZoomButtons(mockMap);
		expect(zoomInBtn.classList.contains('no-zoom')).toBe(true);
		expect(zoomOutBtn.classList.contains('no-zoom')).toBe(false);
	});

	it('adds no-zoom class to zoom-out button if at min zoom', () => {
		mockView.getZoom.mockReturnValue(0);
		updateZoomButtons(mockMap);
		expect(zoomOutBtn.classList.contains('no-zoom')).toBe(true);
		expect(zoomInBtn.classList.contains('no-zoom')).toBe(false);
	});

	it('removes no-zoom class from both buttons if between min and max zoom', () => {
		zoomInBtn.classList.add('no-zoom');
		zoomOutBtn.classList.add('no-zoom');

		mockView.getZoom.mockReturnValue(5);
		updateZoomButtons(mockMap);

		expect(zoomInBtn.classList.contains('no-zoom')).toBe(false);
		expect(zoomOutBtn.classList.contains('no-zoom')).toBe(false);
	});
});
