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
        const respData = response.data;

        const com = [{'topic': 'Env', 'comment': 'comments about env'}, {'topic': 'Anything', 'comment': 'comments about anything'}];
        const data = {
          "case_ref": null,
          "behalf": "them",
          "full-name": "John Smith",
          "over-18": "yes",
          "organisation-name": "Tesco",
          "role": "Operator",
          "address": {
              "line1": "ABC",
              "line2": null,
              "line3": null,
              "postcode": "NE77ND",
              "country": "UK"
          },
          "email": "test@test.com",
          "telephone": "0123456789"
      }
        req.session.orgRegdata = data;
        req.session.comments = com;
        res.redirect(`/${VIEW.REGISTER.ORGANISATION.ADD_ANOTHER_COMMENT}`);
    }
  };