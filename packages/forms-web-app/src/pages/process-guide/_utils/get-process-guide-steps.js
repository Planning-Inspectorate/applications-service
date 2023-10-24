const { preApplicationURL } = require('../pre-application/config');
const { acceptanceURL } = require('../acceptance/config');
const { preExaminationURL } = require('../pre-examination/config');
const { examinationURL } = require('../examination/config');
const { recommendationURL } = require('../recommendation/config');
const { decisionURL } = require('../decision/config');
const { postDecisionURL } = require('../post-decision/config');
const { getProcessGuideStages } = require('./get-process-guide-stages');

const steps = getProcessGuideStages;

const activeStepViewModel = (activeStep, activeStepTitle, { url, title }) => ({
	step: activeStep,
	title: activeStepTitle,
	nextStepURL: url,
	nextStepTitle: title
});

const activeStepsConfig = {
	[preApplicationURL]: activeStepViewModel(1, steps.preApplication.title, steps.acceptance),
	[acceptanceURL]: activeStepViewModel(2, steps.acceptance.title, steps.preExamination),
	[preExaminationURL]: activeStepViewModel(3, steps.preExamination.title, steps.examination),
	[examinationURL]: activeStepViewModel(4, steps.examination.title, steps.recommendation),
	[recommendationURL]: activeStepViewModel(5, steps.recommendation.title, steps.decision),
	[decisionURL]: activeStepViewModel(6, steps.decision.title, steps.postDecision),
	[postDecisionURL]: activeStepViewModel(7, steps.postDecision.title, {})
};

const getProcessGuideSteps = (url) => ({
	steps,
	activeStep: activeStepsConfig[url]
});

module.exports = { getProcessGuideSteps };
