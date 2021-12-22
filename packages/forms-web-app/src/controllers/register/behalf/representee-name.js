const { VIEW } = require('../../../lib/views');

exports.getFullName = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_NAME, {
    representing: req.session.behalfRegdata.representing,
    fullName: req.session.behalfRegdata.representee['full-name'],
  });
};

exports.postFullName = async (req, res) => {
  const { body } = req;

  const { errors = {}, errorSummary = [] } = body;
  if (errors['full-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_NAME, {
      representing: req.session.behalfRegdata.representing,
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representee['full-name'] = body['full-name'];
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_OVER_18}`);
  }
};
