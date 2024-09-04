const stepViewModel = (title, content) => ({
	title,
	content
});

const getMaterialChangeProcessGuideStages = (i18n) => ({
	preApplication: stepViewModel(i18n.t('processGuide.materialChange.preApplication.heading1'), [
		i18n.t('processGuide.materialChange.preApplication.paragraph1'),
		i18n.t('processGuide.materialChange.preApplication.paragraph2'),
		i18n.t('processGuide.materialChange.preApplication.paragraph3')
	]),
	applicationReceived: stepViewModel(
		i18n.t('processGuide.materialChange.applicationReceived.heading1'),
		i18n.t('processGuide.materialChange.applicationReceived.paragraph1')
	),
	applicationPublished: stepViewModel(
		i18n.t('processGuide.materialChange.applicationPublished.heading1'),
		[
			i18n.t('processGuide.materialChange.applicationPublished.paragraph1'),
			i18n.t('processGuide.materialChange.applicationPublished.paragraph2'),
			i18n.t('processGuide.materialChange.applicationPublished.paragraph3'),
			i18n.t('processGuide.materialChange.applicationPublished.paragraph4'),
			i18n.t('processGuide.materialChange.applicationPublished.paragraph5')
		]
	),
	examination: stepViewModel(
		i18n.t('processGuide.materialChange.examination.heading1'),
		i18n.t('processGuide.materialChange.examination.paragraph1')
	),
	recommendation: stepViewModel(
		i18n.t('processGuide.materialChange.recommendation.heading1'),
		i18n.t('processGuide.materialChange.recommendation.paragraph1')
	),
	decision: stepViewModel(i18n.t('processGuide.materialChange.decision.heading1'), [
		i18n.t('processGuide.materialChange.decision.paragraph1'),
		i18n.t('processGuide.materialChange.decision.paragraph2'),
		i18n.t('processGuide.materialChange.decision.paragraph3'),
		i18n.t('processGuide.materialChange.decision.paragraph4')
	]),
	postDecision: stepViewModel(i18n.t('processGuide.materialChange.postDecision.heading1'), [
		i18n.t('processGuide.materialChange.postDecision.paragraph1'),
		i18n.t('processGuide.materialChange.postDecision.paragraph2')
	])
});

module.exports = { getMaterialChangeProcessGuideStages };
