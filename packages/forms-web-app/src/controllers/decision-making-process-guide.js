const { VIEW } = require('../lib/views');

exports.getPreApplication = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.PRE_APPLICATION);
};

exports.getExaminationOfTheApplication = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.EXAMINATION_OF_THE_APPLICATION);
};

exports.getReviewOfTheApplication = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.REVIEW_OF_THE_APPLICATION);
};

exports.getPreExamination = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.PRE_EXAMINATION);
};

exports.getRecommendationAndDecision = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.RECOMMENDATION_AND_DECISION);
};

exports.getWhatHappensAfterTheDecisionIsMade = (_, res) => {
	res.render(VIEW.DCO_PROCESS_GUIDE.WHAT_HAPPENS_AFTER_THE_DECISION_IS_MADE);
};
