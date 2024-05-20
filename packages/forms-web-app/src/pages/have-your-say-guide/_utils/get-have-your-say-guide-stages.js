const { haveYourSayGuideIndexURL } = require('../index/config');
const { takingPartURL } = require('../taking-part/config');
const { decisionMadeURL } = require('../decision-made/config');
const { duringExaminationURL } = require('../during-examination/config');
const { getInvolvedURL } = require('../get-involved/config');
const { registeringURL } = require('../registering/config');

const haveYourSayGuideStagesViewModel = (title, content, linkText, url) => ({
	title,
	content,
	linkText,
	url
});

const getHaveYourSayGuideStages = (i18n) => ({
	index: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.index.heading1'),
		null,
		null,
		haveYourSayGuideIndexURL
	),
	takingPart: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.takingPart.heading1'),
		i18n.t('haveYourSayGuide.takingPart.paragraph1'),
		i18n.t('haveYourSayGuide.takingPart.linkText'),
		takingPartURL
	),
	registering: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.registering.heading1'),
		i18n.t('haveYourSayGuide.registering.paragraph1'),
		i18n.t('haveYourSayGuide.registering.linkText'),
		registeringURL
	),
	getInvolved: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.getInvolved.heading1'),
		i18n.t('haveYourSayGuide.getInvolved.paragraph1'),
		i18n.t('haveYourSayGuide.getInvolved.linkText'),
		getInvolvedURL
	),
	duringExamination: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.duringExamination.heading1'),
		i18n.t('haveYourSayGuide.duringExamination.paragraph1'),
		i18n.t('haveYourSayGuide.duringExamination.linkText'),
		duringExaminationURL
	),
	decisionMade: haveYourSayGuideStagesViewModel(
		i18n.t('haveYourSayGuide.decisionMade.heading1'),
		i18n.t('haveYourSayGuide.decisionMade.paragraph1'),
		i18n.t('haveYourSayGuide.decisionMade.linkText'),
		decisionMadeURL
	)
});

module.exports = { getHaveYourSayGuideStages };
