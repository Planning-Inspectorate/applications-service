const { postRegistration, putComments, authenticateToken } = require('../lib/application-api-wrapper');

const postRegistrationData = async (registration_data) => {
    return await postRegistration(registration_data); 
}

const postCommentsData = async (ipRefNo, comments_data) => {
    return await putComments(ipRefNo, comments_data); 
}

const postAuthToken = async (token, email) => {
    return await authenticateToken(token, email); 
}

module.exports = {
    postRegistrationData,
    postCommentsData,
    postAuthToken
};