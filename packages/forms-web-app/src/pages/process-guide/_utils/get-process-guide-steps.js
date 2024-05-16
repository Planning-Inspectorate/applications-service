const { getProcessGuideStages } = require('./get-process-guide-stages');
const { preApplicationURL } = require('../pre-application/config');
const { acceptanceURL } = require('../acceptance/config');
const { preExaminationURL } = require('../pre-examination/config');
const { examinationURL } = require('../examination/config');
const { recommendationURL } = require('../recommendation/config');
const { decisionURL } = require('../decision/config');
const { postDecisionURL } = require('../post-decision/config');

const activeStepViewModel = (activeStep, activeStepTitle, { title, url }) => ({
	step: activeStep,
	title: activeStepTitle,
	nextStepTitle: title,
	nextStepURL: url
});

const getActiveStep = (url, steps) => {
	const activeSteps = {
		[preApplicationURL]: activeStepViewModel(1, steps.preApplication.title, steps.acceptance),
		[acceptanceURL]: activeStepViewModel(2, steps.acceptance.title, steps.preExamination),
		[preExaminationURL]: activeStepViewModel(3, steps.preExamination.title, steps.examination),
		[examinationURL]: activeStepViewModel(4, steps.examination.title, steps.recommendation),
		[recommendationURL]: activeStepViewModel(5, steps.recommendation.title, steps.decision),
		[decisionURL]: activeStepViewModel(6, steps.decision.title, steps.postDecision),
		[postDecisionURL]: activeStepViewModel(7, steps.postDecision.title, {})
	};

	return activeSteps[url];
};

const getProcessGuideSteps = (i18n, url) => {
	const steps = getProcessGuideStages(i18n);

	return {
		steps,
		activeStep: getActiveStep(url, steps)
	};
};

module.exports = { getProcessGuideSteps };
