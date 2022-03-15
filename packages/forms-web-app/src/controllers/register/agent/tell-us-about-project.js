const { VIEW } = require('../../../lib/views');
const {
  postRegistrationData,
  postCommentsData,
} = require('../../../services/registration.service');

exports.getComments = async (req, res) => {
  const { comment } = req.session;
  res.render(VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT, { comment });
};

exports.postComments = async (req, res) => {
  const { body } = req;

  const { errors = {}, errorSummary = [], comment } = body;
  if (errors.comment || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT, {
      errors,
      errorSummary,
      comment,
    });
    return;
  }

  const mode = req.body.mode ? req.body.mode : req.query.mode;
  if (mode === 'edit') {
    req.session.comment = comment;
    res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
  } else {
    delete body.mode;

    req.session.comment = comment;
    if (mode === 'draft') {
      req.session.mode = 'draft';

      let { ipRefNo } = req.session.behalfRegdata;

      if (!req.session.behalfRegdata.ipRefNo) {
        req.session.behalfRegdata.case_ref = req.session.caseRef;
        const registrationData = JSON.stringify(req.session.behalfRegdata);
        const response = await postRegistrationData(registrationData);
        ipRefNo = response.data;
        req.session.behalfRegdata.ipRefNo = ipRefNo;
      }
      const commentsData = JSON.stringify({
        comments: req.session.comment,
        mode: req.session.mode,
      });
      if (commentsData) await postCommentsData(ipRefNo, commentsData);
      res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`);
    } else {
      req.session.mode = 'final';
      res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
    }
  }
};
