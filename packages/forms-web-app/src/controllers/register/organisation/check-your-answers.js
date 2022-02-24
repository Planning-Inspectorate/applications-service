const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = async (req, res) => {
  res.render(VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS, {
    data: {
      ...req.session.orgRegdata,
      comment: req.session.comment ? req.session.comment : '',
    },
  });
};
