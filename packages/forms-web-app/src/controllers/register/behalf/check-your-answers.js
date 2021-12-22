const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS, {
    data: req.session.behalfRegdata,
    comments: req.session.comments,
  });
};
