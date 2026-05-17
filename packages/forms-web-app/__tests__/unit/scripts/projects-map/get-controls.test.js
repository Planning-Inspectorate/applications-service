/**
 * @jest-environment jsdom
 */
'use strict';

const mockControlsCollection = {};
jest.mock('ol/control/defaults.js', () => ({ defaults: jest.fn() }));

const { defaults } = require('ol/control/defaults.js');
const { getControls } = require('../../../../src/scripts/projects-map/get-controls');

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
