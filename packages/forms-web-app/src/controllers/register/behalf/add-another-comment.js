const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getAnotherComment = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT, {comments: req.session.comments});
};

exports.postAnotherComment = async (req, res) => {
  const { body } = req;
  const addAnotherComment = body['add-another-comment'];
  const { errors = {}, errorSummary = [] } = body;
  if (errors['add-another-comment'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT, {
      errors,
      errorSummary,
    });
    return;
  }

  if (addAnotherComment === 'yes') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.COMMENTS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  }

  // if (req.query.mode === 'edit') {
  //   res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  // } else {
  //   res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  // }
};
