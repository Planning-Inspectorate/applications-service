const {
  postRegistration,
  putComments,
  authenticateToken,
} = require('../lib/application-api-wrapper');

const postRegistrationData = async (registrationData) => {
  return postRegistration(registrationData);
};

const postCommentsData = async (ipRefNo, commentsData) => {
  return putComments(ipRefNo, commentsData);
};

const postAuthToken = async (token, email) => {
  return authenticateToken(token, email);
};

module.exports = {
  postRegistrationData,
  postCommentsData,
  postAuthToken,
};
