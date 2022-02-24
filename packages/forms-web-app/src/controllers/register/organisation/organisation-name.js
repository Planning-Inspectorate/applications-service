const { VIEW } = require('../../../lib/views');

exports.getOrganisationName = async (req, res) => {
  res.render(VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME, {
    organisationName: req.session.orgRegdata['organisation-name'],
  });
};

exports.postOrganisationName = async (req, res) => {
  const { body } = req;

  const { errors = {}, errorSummary = [] } = body;
  if (errors['organisation-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.orgRegdata['organisation-name'] = body['organisation-name'];
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.ROLE}`);
  }
};
