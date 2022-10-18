const {
	postRegistration,
	putComments,
	authenticateToken
} = require('../lib/application-api-wrapper');

const postRegistrationData = (registrationData) => postRegistration(registrationData);

const postCommentsData = (ipRefNo, commentsData) => putComments(ipRefNo, commentsData);

const postAuthToken = (token, email) => authenticateToken(token, email);

module.exports = {
	postRegistrationData,
	postCommentsData,
	postAuthToken
};
