/**
 * @jest-environment jsdom
 */

const sanitiseForm = require('../../../src/scripts/sanitise-form');

const fetchConfig = {
	valid: { error: false, url: '/success' },
	error: { error: true, url: '/' },
	catchError: null
};

const fieldValues = {
	input: {
		one: 'Example of a String with some special characters which are & and £.',
		two: `<b onmouseover=alert('Alert!')>click me!</b>`
	},
	output: {
		one: 'Example%20of%20a%20String%20with%20some%20special%20characters%20which%20are%20%26%20and%20%C2%A3.',
		two: 'click%20me!'
	}
};

document.body.innerHTML = `
	<form id="form-id-one">
		<input name="form-input-name-one" type="text" value="${fieldValues.input.one}" />
		<input name="form-input-name-two" type="text" value="${fieldValues.input.two}" />
	</form>

	<form id="form-id-two">
		<input name="form-input-name-one" type="text" value="${fieldValues.input.one}" />
		<input name="form-input-name-two" type="text" value="${fieldValues.input.two}" />
	</form>

	<form id="form-id-three">
		<input name="form-input-name-one" type="text" value="${fieldValues.input.one}" />
		<input name="form-input-name-two" type="text" value="${fieldValues.input.two}" />
	</form>
`;

const sanitiseFormOne = new sanitiseForm();
sanitiseFormOne.form('#form-id-one', ['form-input-name-one', 'form-input-name-two']);
const formOne = document.querySelector('#form-id-one');

const sanitiseFormTwo = new sanitiseForm();
sanitiseFormTwo.form('#form-id-two', ['form-input-name-one', 'form-input-name-two']);
const formTwo = document.querySelector('#form-id-two');

const sanitiseFormThree = new sanitiseForm();
sanitiseFormThree.form('#form-id-three', ['form-input-name-one', 'form-input-name-two']);
const formThree = document.querySelector('#form-id-three');

function fetch(fetchConfig) {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve(fetchConfig)
		})
	);
}

let assignMock = jest.fn();
delete window.location;
window.location = { assign: assignMock };
window.location.href = '/';

afterEach(() => {
	assignMock = jest.fn();
	delete window.location;
	window.location = { assign: assignMock };
	window.location.href = '/';
});

describe('scripts/sanitise-form', () => {
	describe('response is valid', () => {
		fetch(fetchConfig.valid);
		formOne.submit();

		test('redirect url', async () => {
			expect(window.location.href).toEqual(fetchConfig.valid.url);
		});
	});

	describe('response has error', () => {
		fetch(fetchConfig.error);
		formTwo.submit();

		test('redirect url', () => {
			expect(window.location.href).toEqual(fetchConfig.error.url);
		});

		test('field values sanitised', () => {
			const formData = new FormData(formTwo);
			expect(formData.get('form-input-name-one')).toEqual(fieldValues.output.one);
			expect(formData.get('form-input-name-two')).toEqual(fieldValues.output.two);
		});
	});

	describe('catch-error', () => {
		fetch(fetchConfig.catchError);

		test('throw error', () => {
			expect(formThree.submit).toThrowError(TypeError);
		});
	});
});
