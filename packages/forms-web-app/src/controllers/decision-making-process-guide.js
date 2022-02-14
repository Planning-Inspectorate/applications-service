const { VIEW } = require('../lib/views');

exports.getDecisionMakingProcessGuide = (_, res) => {
  res.render(VIEW.DCO_PROCESS_GUIDE.DECISION_MAKINH_PROCESS_GUIDE);
};

exports.getPreApplication = (_, res) => {
  res.render(VIEW.DCO_PROCESS_GUIDE.PRE_APPLICATION);
};

exports.getReviewOfTheApplication = (_, res) => {
  res.render(VIEW.DCO_PROCESS_GUIDE.REVIEW_OF_THE_APPLICATION);
};
