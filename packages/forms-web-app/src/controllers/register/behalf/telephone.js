const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getTelephone = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.TELEPHONE, {telephone: req.session.behalfRegdata.representor['telephone']});
};

exports.postTelephone = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['telephone'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.TELEPHONE, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representor['telephone'] = body['telephone'];

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  }
};
