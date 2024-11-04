const { processGuideURL } = require('../index/config');
const { preApplicationURL } = require('../pre-application/config');
const { acceptanceURL } = require('../acceptance/config');
const { preExaminationURL } = require('../pre-examination/config');
const { examinationURL } = require('../examination/config');
const { recommendationURL } = require('../recommendation/config');
const { decisionURL } = require('../decision/config');
const { postDecisionURL } = require('../post-decision/config');

const stepViewModel = (title, content, linkText, url) => ({
	title,
	content,
	linkText,
	url
});

const getProcessGuideStages = (i18n) => ({
	index: stepViewModel(i18n.t('processGuide.index.heading1'), null, null, processGuideURL),
	preApplication: stepViewModel(
		i18n.t('processGuide.preApplication.heading1'),
		[
			i18n.t('processGuide.preApplication.paragraph1'),
			i18n.t('processGuide.preApplication.paragraph2')
		],
		i18n.t('processGuide.preApplication.linkText'),
		preApplicationURL
	),
	acceptance: stepViewModel(
		i18n.t('processGuide.acceptance.heading1'),
		i18n.t('processGuide.acceptance.paragraph1'),
		i18n.t('processGuide.acceptance.linkText'),
		acceptanceURL
	),
	preExamination: stepViewModel(
		i18n.t('processGuide.preExamination.heading1'),
		[
			i18n.t('processGuide.preExamination.paragraph1'),
			i18n.t('processGuide.preExamination.paragraph2'),
			i18n.t('processGuide.preExamination.paragraph3')
		],
		i18n.t('processGuide.preExamination.linkText'),
		preExaminationURL
	),
	examination: stepViewModel(
		i18n.t('processGuide.examination.heading1'),
		i18n.t('processGuide.examination.paragraph1'),
		i18n.t('processGuide.examination.linkText'),
		examinationURL
	),
	recommendation: stepViewModel(
		i18n.t('processGuide.recommendation.heading1'),
		i18n.t('processGuide.recommendation.paragraph1'),
		i18n.t('processGuide.recommendation.linkText'),
		recommendationURL
	),
	decision: stepViewModel(
		i18n.t('processGuide.decision.heading1'),
		i18n.t('processGuide.decision.paragraph1'),
		i18n.t('processGuide.decision.linkText'),
		decisionURL
	),
	postDecision: stepViewModel(
		i18n.t('processGuide.postDecision.heading1'),
		[
			i18n.t('processGuide.postDecision.paragraph1'),
			i18n.t('processGuide.postDecision.paragraph2')
		],
		i18n.t('processGuide.postDecision.linkText'),
		postDecisionURL
	)
});

module.exports = {
	getProcessGuideStages
};
