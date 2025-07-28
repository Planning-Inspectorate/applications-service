/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const { initialiseGoogleAnalytics } = require('../../../src/scripts/google-analytics');

describe('scripts/google-analytics', () => {
	const fakeGaId = 'some-test-value';
	const gaIdElement = document.createElement('p');
	gaIdElement.id = 'gaId';
	gaIdElement.textContent = fakeGaId;

	const setupFakeDom = () => {
		document.body.append(gaIdElement);
		const script = document.createElement('script');
		document.body.appendChild(script);
	};

	beforeEach(() => {
		jest.resetAllMocks();

		setupFakeDom();
	});

	afterEach(() => {
		jest.useRealTimers();
		document.body.innerHTML = '';
	});

	it('should initialise google analytics script', () => {
		initialiseGoogleAnalytics(document);

		expect(document.body).toMatchSnapshot();
	});

	it('should create a script tag with the correct src attribute', () => {
		initialiseGoogleAnalytics(document);

		const scriptTags = document.getElementsByTagName('script');
		const gaScriptTag = Array.from(scriptTags).find(
			(script) => script.src === `https://www.googletagmanager.com/gtag/js?id=${fakeGaId}`
		);

		expect(gaScriptTag).toBeDefined();
		expect(gaScriptTag.async).toBe(true);
		expect(gaScriptTag.type).toBe('text/javascript');
	});

	it('should not create a script tag if gaId is not present', () => {
		document.getElementById('gaId').remove();

		initialiseGoogleAnalytics(document);

		const scriptTags = document.getElementsByTagName('script');
		const gaScriptTag = Array.from(scriptTags).find(
			(script) => script.src === `https://www.googletagmanager.com/gtag/js?id=${fakeGaId}`
		);

		expect(gaScriptTag).toBeUndefined();
	});
});
