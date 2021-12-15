const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getCheckYourAnswers = async (req, res) => {
  res.render(VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS,
    {data: req.session.orgRegdata, comments: req.session.comments});
};
