const { sanitiseEncodeString } = require('../lib/sanitise-encode-string');

const getForm = (formID, fieldNames) => {
	const setForm = document.querySelector(formID);
	const hasSetForm = setForm && setForm.nodeName === 'FORM';

	if (!hasSetForm) return;

	const fieldsToSanitise = [];
	const hasInputNames = fieldNames.length > 0;

	if (hasInputNames) {
		fieldNames.forEach((inputName) => {
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

function sanitiseForm() {
	this.form = (formID, fieldNames) => {
		let formSubmissionInProgress = false;

		const { form, fields } = getForm(formID, fieldNames) || {};

		if (!form || !fields) return;

		form.addEventListener('submit', async function onSubmit(event) {
			event.preventDefault();

			if (formSubmissionInProgress) return;

			try {
				formSubmissionInProgress = true;

				const formData = new FormData(form);

				fields.forEach((field) => {
					const sanitisedEncodedString = sanitiseEncodeString(field.value);

					formData.delete(field.name);
					formData.append(field.name, sanitisedEncodedString);
				});

				formData.append('origin', 'sanitise-form-post');

				const response = await fetch(window.location.href, {
					method: 'POST',
					body: formData
				});

				const responseBody = await response.json();

				if (responseBody.error) {
					fields.forEach((field) => {
						field.value = sanitiseEncodeString(field.value);
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
}

module.exports = sanitiseForm;
