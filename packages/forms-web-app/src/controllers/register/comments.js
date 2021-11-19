const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

exports.getComments = async (req, res) => {
  res.render(VIEW.REGISTER.COMMENTS);
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['comments'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.COMMENTS, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.registrationData['comments'] = body['comments'];
  logger.info('-----------------------'+JSON.stringify(req.session));
  res.redirect(`/${VIEW.REGISTER.CHECK_YOUR_ANSWERS}`);
};
