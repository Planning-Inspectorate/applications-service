const mapDocumentFilterLabel = (filterName, filterValue) => {
	const mapping = {
		stage: {
			1: 'Pre-application',
			2: 'Acceptance',
			3: 'Pre-examination',
			4: 'Examination',
			5: 'Recommendation',
			6: 'Recommendation and Decision',
			7: 'Post-decision'
		},
		category: {
			developersapplication: "Developer's Application"
		}
	};

	const normaliseKey = (key) => key.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

	try {
		if (filterName === 'category') {
			return mapping[filterName][normaliseKey(filterValue)] || filterValue;
		}

		return mapping[filterName][filterValue];
	} catch (e) {
		return filterValue;
	}
};

module.exports = {
	mapDocumentFilterLabel
};
