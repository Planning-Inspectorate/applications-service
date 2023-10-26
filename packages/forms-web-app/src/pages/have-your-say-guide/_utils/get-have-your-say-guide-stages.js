const { haveYourSayGuideTitle, haveYourSayGuideIndexURL } = require('../index/config');
const {
	decisionMadeTitle,
	decisionMadeContent,
	decisionMadeURL,
	decisionMadeLinkText
} = require('../decision-made/config');
const {
	duringExaminationTitle,
	duringExaminationContent,
	duringExaminationURL,
	duringExaminationLinkText
} = require('../during-examination/config');
const {
	getInvolvedTitle,
	getInvolvedContent,
	getInvolvedURL,
	getInvolvedLinkText
} = require('../get-involved/config');
const {
	registeringTitle,
	registeringContent,
	registeringURL,
	registeringLinkText
} = require('../registering/config');
const {
	takingPartTitle,
	takingPartContent,
	takingPartURL,
	takingPartLinkText
} = require('../taking-part/config');

const haveYourSayGuideStagesViewModel = (title, content, url, linkText) => ({
	title,
	content,
	url,
	linkText
});

const getHaveYourSayGuideStages = {
	haveYourSayGuide: haveYourSayGuideStagesViewModel(
		haveYourSayGuideTitle,
		null,
		haveYourSayGuideIndexURL,
		null
	),
	takingPart: haveYourSayGuideStagesViewModel(
		takingPartTitle,
		takingPartContent,
		takingPartURL,
		takingPartLinkText
	),
	registering: haveYourSayGuideStagesViewModel(
		registeringTitle,
		registeringContent,
		registeringURL,
		registeringLinkText
	),
	getInvolved: haveYourSayGuideStagesViewModel(
		getInvolvedTitle,
		getInvolvedContent,
		getInvolvedURL,
		getInvolvedLinkText
	),
	duringExamination: haveYourSayGuideStagesViewModel(
		duringExaminationTitle,
		duringExaminationContent,
		duringExaminationURL,
		duringExaminationLinkText
	),
	decisionMade: haveYourSayGuideStagesViewModel(
		decisionMadeTitle,
		decisionMadeContent,
		decisionMadeURL,
		decisionMadeLinkText
	)
};

module.exports = { getHaveYourSayGuideStages };
