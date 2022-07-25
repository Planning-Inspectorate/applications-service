const { encodeString } = require('../encode-string');
const { sanitiseString } = require('../sanitise-string');

const submit = (payload) => {
	let formSubmissionInProgress = false;

	const { form, fields } = payload;

	if (!form || !fields) return;

	form.addEventListener('submit', async function onSubmit(event) {
		event.preventDefault();

		if (formSubmissionInProgress) return;

		try {
			formSubmissionInProgress = true;

			const formData = new FormData(form);

			fields.forEach((field) => {
				const sanitisedString = sanitiseString(field.value);
				const encodedString = encodeString(sanitisedString);

				formData.delete(field.name);
				formData.append(field.name, encodedString);
			});

			formData.append('origin', 'sanitise-form-post');

			const response = await fetch(window.location.href, {
				method: 'POST',
				body: formData
			});

			const responseBody = await response.json();

			if (responseBody.error) {
				fields.forEach((field) => {
					field.value = sanitiseString(field.value);
				});

				form.submit();

				return;
			} else {
				window.location.href = responseBody.url;

				return;
			}
		} catch (error) {
			this.removeEventListener('submit', onSubmit);
			form.submit();
		} finally {
			formSubmissionInProgress = false;
		}
	});
};

const set = (form, inputNames) => {
	const setForm = document.querySelector(form);
	const hasSetForm = setForm && setForm.nodeName === 'FORM';

	if (!hasSetForm) return;

	const fieldsToSanitise = [];
	const hasInputNames = inputNames.length > 0;

	if (hasInputNames) {
		inputNames.forEach((inputName) => {
			const inputs = [...setForm.querySelectorAll(`[name="${inputName}"]`)];
			const hasInputs = inputs.length > 0;

			if (!hasInputs) return;

			inputs.forEach((input) => {
				if (input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA') {
					fieldsToSanitise.push(input);
				}
			});
		});
	}

	const hasFieldsToSanitise = fieldsToSanitise.length > 0;

	if (!hasFieldsToSanitise) return;

	return {
		form: setForm,
		fields: fieldsToSanitise
	};
};

const sanitiseForm = (form, inputNames) => {
	const formFields = set(form, inputNames);

	if (formFields) {
		submit(formFields);
	}
};

module.exports = sanitiseForm;
