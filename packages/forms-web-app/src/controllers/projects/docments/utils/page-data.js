const pageData = (case_ref) => {
	const baseUrl = `/projects/${case_ref}`;
	const pageUrl = `documents`;

	return {
		caseRef: case_ref,
		baseUrl,
		pageUrl
	};
};

module.exports = {
	pageData
};
