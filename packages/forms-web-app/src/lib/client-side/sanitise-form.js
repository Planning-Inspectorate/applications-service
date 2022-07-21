const { encodeString } = require('../encode-string');
const { sanitiseString } = require('../sanitise-string');

const submit = (payload) => {
	const { form, fields } = payload;

	if (!form || !fields) return;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		try {
			const formData = new FormData(form);

			fields.forEach((field) => {
				const sanitisedString = sanitiseString(field.value);
				const encodedString = encodeString(sanitisedString);

				formData.delete(field.name);
				formData.append(field.name, encodedString);
			});

			const response = await fetch(window.location.href, {
				method: 'POST',
				body: formData
			});

			if (!response.url) {
				form.submit();

				return;
			}

			if (window.location.href === response.url) {
				fields.forEach((field) => {
					field.value = sanitiseString(field.value);
				});

				form.submit();

				return;
			} else {
				window.location = response.url;

				return;
			}
		} catch (error) {
			form.submit();
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
