/**
 * @jest-environment jsdom
 *
 * @fileoverview Unit tests for `setupEpsg27700`, `getControls`, and `updateZoomButtons` ({@link module:scripts/projects-map/map-setup}).
 */
'use strict';

jest.mock('proj4/dist/proj4', () => ({ defs: jest.fn() }));
jest.mock('ol/proj/proj4.js', () => ({ register: jest.fn() }));
jest.mock('ol/proj.js', () => ({
	get: jest.fn().mockReturnValue({ setExtent: jest.fn() }),
	transform: jest.fn((coords) => coords)
}));
jest.mock('ol/control/defaults.js', () => ({ defaults: jest.fn() }));

const {
	setupEpsg27700,
	getControls,
	updateZoomButtons
} = require('../../../../src/scripts/projects-map/map-setup');
const {
	EPSG_27700,
	EPSG27700_PROJ4_DEF,
	EPSG27700_EXTENT
} = require('../../../../src/scripts/projects-map/constants');
const proj4 = require('proj4/dist/proj4');
const { register } = require('ol/proj/proj4.js');
const { get: getProjection } = require('ol/proj.js');
const { defaults } = require('ol/control/defaults.js');

const mockControlsCollection = {};

beforeEach(() => {
	defaults.mockReturnValue(mockControlsCollection);
});

describe('setupEpsg27700', () => {
	it('registers the EPSG:27700 definition string with proj4', () => {
		setupEpsg27700();
		expect(proj4.defs).toHaveBeenCalledWith(EPSG_27700, EPSG27700_PROJ4_DEF);
	});

	it('calls register() with the proj4 instance to sync with OL', () => {
		setupEpsg27700();
		expect(register).toHaveBeenCalledWith(proj4);
	});

	it('retrieves the EPSG:27700 projection object from OL', () => {
		setupEpsg27700();
		expect(getProjection).toHaveBeenCalledWith(EPSG_27700);
	});

	it('sets the British National Grid extent on the projection', () => {
		setupEpsg27700();
		const projection = getProjection.mock.results[0].value;
		expect(projection.setExtent).toHaveBeenCalledWith(EPSG27700_EXTENT);
	});

	it('returns the configured projection object', () => {
		const result = setupEpsg27700();
		const projection = getProjection.mock.results[0].value;
		expect(result).toBe(projection);
	});

	it('the exported extent matches the expected BNG bounds', () => {
		expect(EPSG27700_EXTENT).toEqual([-238375.0, 0.0, 900000.0, 1376256.0]);
	});
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
