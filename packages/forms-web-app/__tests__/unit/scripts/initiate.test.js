/**
 * @jest-environment jsdom
 */

const initiate = require('../../../src/scripts/initiate');

describe('scripts/initiate', () => {
	document.value = {
		pass: {},
		fail: {}
	};

	const initiateScriptsConfig = {
		pass: [
			{
				callback: () => {
					document.value.pass.callbackFunction = 'typeof callback === function';
				},
				id: 'pass-typeof-callback-function',
				src: '/test/scripts/pass/typeof-callback-function'
			},
			{
				callback: "document.value.pass.callbackString = 'typeof callback === string'",
				id: 'pass-typeof-callback-string',
				src: '/test/scripts/pass/typeof-callback-string'
			},
			{
				src: '/test/scripts/pass/no-id'
			},
			{
				async: true,
				src: '/test/scripts/pass/async-true'
			},
			{
				defer: true,
				src: '/test/scripts/pass/defer-true'
			}
		],
		fail: {
			noSrcConfig: [
				{
					callback: () => {
						document.value.fail.noSrc = 'config object has no src';
					},
					id: 'fail-no-src'
				}
			],
			notArray: {
				id: 'fail-not-array',
				src: 'test/scripts/fail/not-array'
			},
			notObject: [null]
		}
	};

	const initiatePass = new initiate();
	initiatePass.scripts(initiateScriptsConfig.pass);
	const scriptPassCallbackFunction = document.querySelector('#pass-typeof-callback-function');
	const scriptPassCallbackString = document.querySelector('#pass-typeof-callback-string');

	const initiateFailNoSrc = new initiate();
	initiateFailNoSrc.scripts(initiateScriptsConfig.fail.noSrcConfig);
	const scriptFailNoSrc = document.querySelector('#fail-no-src');

	const initiateFailNotArray = new initiate();
	initiateFailNotArray.scripts(initiateScriptsConfig.fail.notArray);
	const scriptFailNotArray = document.querySelector('#fail-not-array');

	const allScriptTags = [...document.querySelectorAll('script')];

	const loadEvent = new Event('load');

	test('Expect new initiate() to be an object', () => {
		const initiateToBeObject = new initiate();

		expect(typeof initiateToBeObject).toBe('object');
	});

	test('Expect initiatePass.scripts to be a function', () => {
		const initiateToBeFunction = new initiate();

		expect(typeof initiateToBeFunction.scripts).toBe('function');
	});

	test('Expect script tag to be defined', () => {
		expect(scriptPassCallbackFunction).toBeDefined();
		expect(scriptPassCallbackString).toBeDefined();
	});

	test('Expect callback to be executed', () => {
		scriptPassCallbackFunction.dispatchEvent(loadEvent);
		scriptPassCallbackString.dispatchEvent(loadEvent);

		expect(document.value.pass.callbackFunction).toEqual('typeof callback === function');
		expect(document.value.pass.callbackString).toEqual('typeof callback === string');
	});

	test('Expect script tag to have src attibute without an id attibute', () => {
		const scriptHasSrcNoID = allScriptTags.find((scriptTag) => {
			return scriptTag.getAttribute('src') && !scriptTag.getAttribute('id');
		});

		expect(scriptHasSrcNoID).toBeDefined();
	});

	test('Expect script tag to have async attibute without a defer attibute', () => {
		const scriptHasAsync = allScriptTags.find((scriptTag) => {
			return scriptTag.getAttribute('async') && !scriptTag.getAttribute('defer');
		});

		expect(scriptHasAsync).toBeDefined();
	});

	test('Expect script tag to have defer attibute without an async attibute', () => {
		const scriptHasDefer = allScriptTags.find((scriptTag) => {
			return scriptTag.getAttribute('defer') && !scriptTag.getAttribute('async');
		});

		expect(scriptHasDefer).toBeDefined();
	});

	test('Expect callback to not be executed when src attribute is not present', () => {
		expect(scriptFailNoSrc).toBeNull();
		expect(document.value.fail.noSrc).not.toBeDefined();
	});

	test('Expect script tag to be null when config is not an array', () => {
		expect(scriptFailNotArray).toBeNull();
	});

	test('Expect config object to not add a script', () => {
		const allScriptTagsOriginal = allScriptTags;

		const initiateFailNotObject = new initiate();
		initiateFailNotObject.scripts(initiateScriptsConfig.fail.notObject);

		expect(allScriptTagsOriginal).toEqual(allScriptTags);
	});
});
