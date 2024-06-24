const mapStageTranslations = (en, cy) => ({
	en,
	cy
});

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

const projectStagesTranslations = {
	1: mapStageTranslations('Pre-application', 'Cyn-ymgeisio'),
	2: mapStageTranslations(
		'Acceptance (review of the application)',
		'Acceptance (review of the application)'
	),
	3: mapStageTranslations('Pre-examination', 'Cyn-archwiliad'),
	4: mapStageTranslations('Examination', 'Archwiliad'),
	5: mapStageTranslations('Recommendation', 'Argymhelliad'),
	6: mapStageTranslations('Decision', 'Penderfyniad'),
	7: mapStageTranslations('Decided', 'Decided'),
	8: mapStageTranslations('Withdrawn', `Wedi'i dynnu'n ôl`)
};

const projectInfoProjectStages = {
	1: 'Pre-application',
	2: 'Acceptance',
	3: 'Pre-examination',
	4: 'Examination',
	5: 'Recommendation',
	6: 'Decision',
	7: 'Post-decision',
	8: 'Withdrawn'
};

const registerOfApplicationsStages = [
	'acceptance',
	'pre_examination',
	'examination',
	'recommendation',
	'decision',
	'post_decision',
	'withdrawn'
];

module.exports = {
	documentProjectStages,
	projectStages,
	projectStagesTranslations,
	projectInfoProjectStages,
	registerOfApplicationsStages
};
