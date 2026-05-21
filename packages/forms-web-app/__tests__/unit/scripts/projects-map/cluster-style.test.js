/**
 * @fileoverview Unit tests for `clusterStyle` ({@link module:scripts/projects-map/layers}).
 *
 * `clusterStyle` is the OpenLayers style function attached to the AnimatedCluster
 * layer on /projects-map. It is called once per cluster feature and must return:
 *   - `null`  when a cluster has been expanded (0 inner features)
 *   - an array of two Style objects (drop-shadow circle + main circle) for any
 *     non-empty cluster
 *
 * All OL style constructors are mocked so tests run without a browser or canvas.
 */
'use strict';

jest.mock('ol/style/Style.js', () => ({
	__esModule: true,
	default: jest.fn((opts) => ({ _type: 'Style', opts }))
}));
jest.mock('ol/style/Circle.js', () => ({
	__esModule: true,
	default: jest.fn((opts) => ({ _type: 'Circle', opts }))
}));
jest.mock('ol/style/Fill.js', () => ({
	__esModule: true,
	default: jest.fn((opts) => ({ _type: 'Fill', opts }))
}));
jest.mock('ol/style/Stroke.js', () => ({
	__esModule: true,
	default: jest.fn((opts) => ({ _type: 'Stroke', opts }))
}));
jest.mock('ol/style/Text.js', () => ({
	__esModule: true,
	default: jest.fn((opts) => ({ _type: 'Text', opts }))
}));

const { clusterStyle } = require('../../../../src/scripts/projects-map/layers');
const Circle = require('ol/style/Circle.js').default;
const Fill = require('ol/style/Fill.js').default;
const Stroke = require('ol/style/Stroke.js').default;
const Text = require('ol/style/Text.js').default;

/**
 * Creates a minimal OL Feature stub that mimics the shape of a cluster feature
 * as produced by `ol/source/Cluster`.
 *
 * AnimatedCluster calls `feature.get('features')` to retrieve the array of
 * inner (real) features that were grouped into this cluster.
 *
 * @param {number} innerCount - Number of inner features the cluster should appear to contain.
 * @returns {{ get: jest.Mock }} A plain object with a `get` spy.
 */
function makeFeature(innerCount) {
	const inner = Array.from({ length: innerCount }, () => ({}));
	return { get: jest.fn((key) => (key === 'features' ? inner : undefined)) };
}

describe('clusterStyle', () => {
	it('returns null for a cluster with 0 inner features (expanded state)', () => {
		expect(clusterStyle(makeFeature(0), 'red', 'white')).toBeNull();
	});

	it('returns an array of exactly two Style objects for a single feature', () => {
		const result = clusterStyle(makeFeature(1), 'red', 'white');
		expect(Array.isArray(result)).toBe(true);
		expect(result).toHaveLength(2);
	});

	it('returns an array of exactly two Style objects for multiple features', () => {
		expect(clusterStyle(makeFeature(5), 'red', 'white')).toHaveLength(2);
	});

	it('uses radius 8 for a single feature', () => {
		clusterStyle(makeFeature(1), 'red', 'white');
		const radiusValues = Circle.mock.calls.map((c) => c[0].radius);
		expect(radiusValues).toContain(8);
	});

	it('uses a larger radius for multiple features (base 12 + count)', () => {
		clusterStyle(makeFeature(5), 'red', 'white');
		const expectedRadius = 12 + 5;
		const radiusValues = Circle.mock.calls.map((c) => c[0].radius);
		expect(radiusValues).toContain(expectedRadius);
	});

	it('caps the count contribution to the radius at 20', () => {
		clusterStyle(makeFeature(25), 'red', 'white');
		const radiusValues = Circle.mock.calls.map((c) => c[0].radius);
		expect(radiusValues).toContain(12 + 20);
		expect(radiusValues).not.toContain(12 + 25);
	});

	it('does not create a Text label for a single feature', () => {
		clusterStyle(makeFeature(1), 'red', 'white');
		expect(Text).not.toHaveBeenCalled();
	});

	it('creates a Text label showing the count for multiple features', () => {
		clusterStyle(makeFeature(7), 'red', 'white');
		expect(Text).toHaveBeenCalledWith(expect.objectContaining({ text: '7' }));
	});

	it('applies markerFill to the circle fill colour', () => {
		clusterStyle(makeFeature(3), '#ff0000', '#ffffff');
		expect(Fill).toHaveBeenCalledWith(expect.objectContaining({ color: '#ff0000' }));
	});

	it('applies markerStroke to the circle stroke colour and count label fill', () => {
		clusterStyle(makeFeature(3), '#ff0000', '#ffffff');
		expect(Stroke).toHaveBeenCalledWith(expect.objectContaining({ color: '#ffffff', width: 2 }));
	});

	it('adds a drop-shadow circle with a fixed displacement', () => {
		clusterStyle(makeFeature(1), 'red', 'white');
		expect(Circle).toHaveBeenCalledWith(expect.objectContaining({ displacement: [2, -2] }));
	});
});
