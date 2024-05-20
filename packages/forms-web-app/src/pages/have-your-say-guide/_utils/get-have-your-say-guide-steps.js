const { decisionMadeURL } = require('../decision-made/config');
const { duringExaminationURL } = require('../during-examination/config');
const { getInvolvedURL } = require('../get-involved/config');
const { registeringURL } = require('../registering/config');
const { takingPartURL } = require('../taking-part/config');

const { getHaveYourSayGuideStages } = require('./get-have-your-say-guide-stages');

const activeStepViewModel = (activeStep, activeStepTitle, { url, title }) => ({
	step: activeStep,
	title: activeStepTitle,
	nextStepURL: url,
	nextStepTitle: title
});

const getActiveStep = (url, steps) => {
	const activeSteps = {
		[takingPartURL]: activeStepViewModel(1, steps.takingPart.title, steps.registering),
		[registeringURL]: activeStepViewModel(2, steps.registering.title, steps.getInvolved),
		[getInvolvedURL]: activeStepViewModel(3, steps.getInvolved.title, steps.duringExamination),
		[duringExaminationURL]: activeStepViewModel(
			4,
			steps.duringExamination.title,
			steps.decisionMade
		),
		[decisionMadeURL]: activeStepViewModel(5, steps.decisionMade.title, {})
	};

	return activeSteps[url];
};

const getHaveYourSayGuideSteps = (i18n, url) => {
	const steps = getHaveYourSayGuideStages(i18n);

	return {
		steps,
		activeStep: getActiveStep(url, steps)
	};
};

module.exports = { getHaveYourSayGuideSteps };
