const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getComments = async (req, res) => {
  const { comment } = req.session;
  res.render(VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT, { comment });
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;

  if (errors.comment || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.ORGANISATION.TELL_US_ABOUT_PROJECT, {
      errors,
      errorSummary,
      comment: body,
    });
    return;
  }

  const mode = req.body.mode ? req.body.mode : req.query.mode;

  if (mode === 'edit') {
    const { comment } = body;
    req.session.comment = comment;
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
  } else {
    delete body.mode;
    const { comment } = body;
    req.session.comment = comment;
    if (mode === 'draft') {
      req.session.mode = 'draft';
      res.redirect(`/${VIEW.REGISTER.ORGANISATION.CONFIRMATION}`);
    } else {
      req.session.mode = 'final';
      res.redirect(`/${VIEW.REGISTER.ORGANISATION.CHECK_YOUR_ANSWERS}`);
    }
  }
};
