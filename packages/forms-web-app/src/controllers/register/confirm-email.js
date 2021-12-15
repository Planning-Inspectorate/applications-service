const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');
const config = require('../../config');
const { postAuthToken } = require('../../services/registration.service');
exports.getConfirmEmail = async (req, res) => {
    const token = req.query.token
    res.render(VIEW.REGISTER.CONFIRM_EMAIL);
};

exports.postConfirmEmail = async (req, res) => {
    const { body } = req;
    const { errors = {}, errorSummary = [] } = body;
    if (errors['email'] || Object.keys(errors).length > 0) {
      res.render(VIEW.REGISTER.CONFIRM_EMAIL, {
        errors,
        errorSummary,
      });
      return;
    }
    const token = req.query.token;
    const email = JSON.stringify({email: body.email});
  
    const response = await postAuthToken(token, email);
    if (response.resp_code === 404) {
        res.render(VIEW.REGISTER.TOKEN_NOT_VERIFIED);
    } else {
        const { personal_data, comments, submissionPeriodClosed } = response.data;
        if(submissionPeriodClosed === true) {
          res.render(VIEW.REGISTER.TOKEN_EXPIRED);
        } else {
          const type = personal_data.behalf;
          req.session.comments = comments;
          if(type === 'me') {
            req.session.mySelfRegdata = personal_data;
            res.redirect(`/${VIEW.REGISTER.MYSELF.ADD_ANOTHER_COMMENT}`);
          } else if(type === 'them') {
            req.session.orgRegdata = personal_data;
            res.redirect(`/${VIEW.REGISTER.ORGANISATION.ADD_ANOTHER_COMMENT}`);
          } else if(type === 'you') {
            req.session.behalfRegdata = personal_data;
            res.redirect(`/${VIEW.REGISTER.BEHALF.ADD_ANOTHER_COMMENT}`);
          }
        }
    }
  };
