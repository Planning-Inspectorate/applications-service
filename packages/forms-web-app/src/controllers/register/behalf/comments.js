const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getComments = async (req, res) => {
  if (req.query.mode === 'edit') {
    const { index } = req.query;
    const comment = req.session.comments[index];
    res.render(VIEW.REGISTER.BEHALF.COMMENTS, { comment });
  } else {
    res.render(VIEW.REGISTER.BEHALF.COMMENTS);
  }
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors.comments || Object.keys(errors).length > 0) {
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
    if (req.query.src === 'add') {
      res.redirect(`/${VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT}`);
    } else {
      res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
    }
  } else {
    let { comments } = req.session;
    if (comments === undefined) {
      comments = [];
    }

    delete body.mode;
    comments.push(body);
    req.session.comments = comments;
    if (mode === 'draft') {
      req.session.mode = 'draft';
      res.redirect(`/${VIEW.REGISTER.BEHALF.CONFIRMATION}`);
    } else {
      req.session.mode = 'final';
      if (req.session.comments.length < config.applications.noOfCommentsAllowed) {
        res.redirect(`/${VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT}`);
      } else {
        res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
      }
    }
  }
};
