const documentProjectStages = {
	1: {
		name: 'Pre-application',
		value: '1'
	},
	2: {
		name: 'Acceptance (review of the application)',
		value: '2'
	},
	3: {
		name: 'Pre-examination',
		value: '3'
	},
	4: {
		name: 'Examination',
		value: '4'
	},
	5: {
		name: 'Recommendation and decision',
		value: '5'
	},
	6: {
		name: 'Decided',
		value: '7'
	}
};

const projectStages = {
	1: 'Pre-application',
	2: 'Acceptance (review of the application)',
	3: 'Pre-examination',
	4: 'Examination',
	5: 'Recommendation',
	6: 'Decision',
	7: 'Decided',
	8: 'Withdrawn'
};

const projectInfoProjectStages = {
	1: 'Pre-application',
	2: 'Acceptance',
	3: 'Pre-examination',
	4: 'Examination',
	5: 'Recommendation',
	6: 'Decision',
	7: 'Post-decision'
};

module.exports = {
	documentProjectStages,
	projectStages,
	projectInfoProjectStages
};
