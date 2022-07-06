import sanitiseString from './utils/sanitise-string.mjs';

window.App = window.App || {};
window.App.Modules = window.App.Modules || {};

((Modules) => {
	Modules.SanitiseForm = function (form, inputNames) {
		const submit = (payload) => {
			const { form, fields } = payload;

			form.addEventListener('submit', async (event) => {
				event.preventDefault();

				try {
					const formData = new FormData(form);

					fields.forEach((field) => {
						formData.delete(field.name);
						formData.append(field.name, sanitiseString(field.value));
					});

					const response = await fetch(window.location.href, {
						method: 'POST',
						body: formData
					});

					if (!response.url) {
						form.submit();
					}

					if (window.location.href === response.url) {
						fields.forEach((field) => {
							field.value = sanitiseString(field.value);
						});

						form.submit();
					} else {
						window.location = response.url;
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

		this.init = () => {
			submit(set(form, inputNames));
		};
	};
})(window.App.Modules);
