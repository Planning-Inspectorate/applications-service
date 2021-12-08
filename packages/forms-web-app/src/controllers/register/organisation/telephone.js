const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getTelephone = async (req, res) => {
  res.render(VIEW.REGISTER.ORGANISATION.TELEPHONE, {telephone: req.session.orgRegdata['telephone']});
};

exports.postTelephone = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['telephone'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.ORGANISATION.TELEPHONE, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.orgRegdata['telephone'] = body['telephone'];

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.COMMENTS}`);
  }
};
