/**
 * @jest-environment jsdom
 */

const sanitiseForm = require('../../../../src/lib/client-side/sanitise-form');

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ error: false, url: '/success' })
	})
);

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };
window.location.href = '/';

it('lib/client-side/sanitise-form', () => {
	document.body.innerHTML = `
		<form id="form-id">
			<input name="form-input-name" type="text" value="test" />
		</form>
	`;

	sanitiseForm('#form-id', ['form-input-name']);

	const setForm = document.querySelector('#form-id');
	const submitEvent = new Event('submit');
	setForm.dispatchEvent(submitEvent);

	expect(global.fetch).toHaveBeenCalledTimes(1);
});
