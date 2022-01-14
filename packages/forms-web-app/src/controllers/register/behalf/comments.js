const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getComments = async (req, res) => {
  const { comment } = req.session;
  res.render(VIEW.REGISTER.BEHALF.COMMENTS, { comment });
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors.comment || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.COMMENTS, {
      errors,
      errorSummary,
      comment: body,
    });
    return;
  }

  const mode = req.body.mode ? req.body.mode : req.query.mode;

  if (mode === 'edit') {
    const { index } = req.query;
    req.session.comments[index] = body;
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    delete body.mode;
    const { comment } = body;
    req.session.comment = comment;

    if (mode === 'draft') {
      req.session.mode = 'draft';
      res.redirect(`/${VIEW.REGISTER.BEHALF.CONFIRMATION}`);
    } else {
      req.session.mode = 'final';
      res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
    }
  }
};
