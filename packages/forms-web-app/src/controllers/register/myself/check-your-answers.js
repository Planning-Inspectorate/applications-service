const { VIEW } = require('../../../lib/views');

exports.getCheckYourAnswers = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS, {
    data: {
      ...req.session.mySelfRegdata,
      // Until we implement the flow which will ensure that there is a comment in req.session.mySelfRegdata, use a placeholder comment
      comment: 'A placeholder comment',
    },
  });
};
