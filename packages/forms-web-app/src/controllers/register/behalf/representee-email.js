const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getEmail = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_EMAIL, {email: req.session.behalfRegdata.representee['email']});
};

exports.postEmail = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['email'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_EMAIL, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representee['email'] = body['email'];
  req.session.behalfRegdata.representor['email'] = body['email']; //TODO REMOVE

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_TELEPHONE}`);
  }
};
