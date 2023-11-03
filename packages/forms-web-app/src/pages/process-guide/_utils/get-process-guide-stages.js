const { processGuideTitle, processGuideURL } = require('../index/config');
const {
	preApplicationTitle,
	preApplicationContent,
	preApplicationURL,
	preApplicationLinkText
} = require('../pre-application/config');
const {
	acceptanceTitle,
	acceptanceContent,
	acceptanceURL,
	acceptanceLinkText
} = require('../acceptance/config');
const {
	preExaminationTitle,
	preExaminationContent,
	preExaminationURL,
	preExaminationLinkText
} = require('../pre-examination/config');
const {
	examinationTitle,
	examinationContent,
	examinationURL,
	examinationLinkText
} = require('../examination/config');
const {
	recommendationTitle,
	recommendationContent,
	recommendationURL,
	recommendationLinkText
} = require('../recommendation/config');
const {
	decisionTitle,
	decisionContent,
	decisionURL,
	decisionLinkText
} = require('../decision/config');
const {
	postDecisionTitle,
	postDecisionContent,
	postDecisionURL,
	postDecisionLinkText
} = require('../post-decision/config');

const processGuideStagesViewModel = (title, content, url, linkText) => ({
	title,
	content,
	url,
	linkText
});

const getProcessGuideStages = {
	processGuide: processGuideStagesViewModel(processGuideTitle, null, processGuideURL, null),
	preApplication: processGuideStagesViewModel(
		preApplicationTitle,
		preApplicationContent,
		preApplicationURL,
		preApplicationLinkText
	),
	acceptance: processGuideStagesViewModel(
		acceptanceTitle,
		acceptanceContent,
		acceptanceURL,
		acceptanceLinkText
	),
	preExamination: processGuideStagesViewModel(
		preExaminationTitle,
		preExaminationContent,
		preExaminationURL,
		preExaminationLinkText
	),
	examination: processGuideStagesViewModel(
		examinationTitle,
		examinationContent,
		examinationURL,
		examinationLinkText
	),
	recommendation: processGuideStagesViewModel(
		recommendationTitle,
		recommendationContent,
		recommendationURL,
		recommendationLinkText
	),
	decision: processGuideStagesViewModel(
		decisionTitle,
		decisionContent,
		decisionURL,
		decisionLinkText
	),
	postDecision: processGuideStagesViewModel(
		postDecisionTitle,
		postDecisionContent,
		postDecisionURL,
		postDecisionLinkText
	)
};

module.exports = {
	getProcessGuideStages
};
