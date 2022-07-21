/**
 * @jest-environment jsdom
 */

const sanitiseForm = require('../../../../src/lib/client-side/sanitise-form');

describe('lib/client-side/sanitise-form', () => {
	document.body.innerHTML = `
		<form id="form-id">
			<input name="form-input-name" type="text" value="test" />
		</form>
	`;
	sanitiseForm('#form-id', ['form-input-name']);

	const setForm = document.querySelector('#form-id');
	const formData = new FormData(setForm);
	const submitEvent = new Event('submit');

	setForm.dispatchEvent(submitEvent);

	test('expect fetch to be called on form submission', () => {
		expect(global.fetch).toHaveBeenCalledWith(window.location.href, {
			body: formData,
			method: 'POST'
		});
	});
});
