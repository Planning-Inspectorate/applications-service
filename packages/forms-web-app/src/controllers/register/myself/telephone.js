const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getTelephone = async (req, res) => {
  res.render(VIEW.REGISTER.TELEPHONE);
};

exports.postTelephone = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['telephone'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.TELEPHONE, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.registrationData['telephone'] = body['telephone'];
  logger.info('-----------------------'+JSON.stringify(req.session));
  res.redirect(`/${VIEW.REGISTER.MYSELF.COMMENTS}`);
};
