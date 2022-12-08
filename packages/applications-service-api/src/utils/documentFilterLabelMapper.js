const mapDocumentFilterLabel = (filterName, filterValue) => {
	try {
		return {
			stage: {
				1: 'Pre-application',
				2: 'Acceptance',
				3: 'Pre-examination',
				4: 'Examination',
				5: 'Recommendation',
				6: 'Decision',
				7: 'Post-decision'
			},
			category: {
				"Developer's Application": "Developer's Application"
			}
		}[filterName][filterValue];
	} catch (e) {
		return filterValue;
	}
};

module.exports = {
	mapDocumentFilterLabel
};
