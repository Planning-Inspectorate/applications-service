const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getFullName = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_NAME, {
    representing: req.session.behalfRegdata['representing'],
    fullName: req.session.behalfRegdata.representee['full-name'],
  });
};

exports.postFullName = async (req, res) => {
  const { body } = req;
  const name = body['full-name'];
  const { errors = {}, errorSummary = [] } = body;
  if (errors['full-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_NAME, {
      representing: req.session.behalfRegdata['representing'],
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representee['full-name'] = name;
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    if (name === 'organisation') {
      res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS}`);
    } else {
      res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_OVER_18}`);
    }
  }
};
