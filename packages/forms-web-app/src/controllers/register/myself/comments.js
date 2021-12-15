const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getComments = async (req, res) => {
  if (req.query.mode === 'edit') {
    const index = req.query.index; 
    const comment = req.session.comments[index];
    res.render(VIEW.REGISTER.MYSELF.COMMENTS, {comment: comment});
  } else {
    res.render(VIEW.REGISTER.MYSELF.COMMENTS);
  }
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['comments'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.COMMENTS, {
      errors,
      errorSummary,
      comment: body
    });
    return;
  }
  
  if (req.query.mode === 'edit') {
    const index = req.query.index; 
    req.session.comments[index] = body;
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    let comments = req.session.comments;
    if (comments === undefined) {
      comments = [];
    }
    const mode = body.mode;
    delete body.mode;
    comments.push(body);
    req.session.comments = comments;
    if (mode === 'draft') {
      req.session.mode = 'draft';
      res.redirect(`/${VIEW.REGISTER.MYSELF.CONFIRMATION}`);  
    } else {
      req.session.mode = 'final';
      if (req.session.comments.length < config.applications.noOfCommentsAllowed) {
        res.redirect(`/${VIEW.REGISTER.MYSELF.ADD_ANOTHER_COMMENT}`);  
      } else {
        res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
      }
    }
  }
  
};
