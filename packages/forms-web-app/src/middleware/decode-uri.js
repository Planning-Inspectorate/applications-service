const decodeUri = (ref, formFields) => (req, res, next) => {
	try {
		formFields.forEach((formField) => {
			const fieldRef = req[ref];

			if (!fieldRef) return;

			const field = fieldRef[formField];

			if (!field) return;

			const decodedUri = decodeURIComponent(field);

			req[ref][formField] = decodedUri;
		});

		return next();
	} catch {
		return next();
	}
};

module.exports = decodeUri;
