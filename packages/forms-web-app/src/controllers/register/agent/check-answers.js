const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = async (req, res) => {
  res.render(VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS, {
    data: {
      ...req.session.behalfRegdata,
      comment: req.session.comment,
    },
  });
};
