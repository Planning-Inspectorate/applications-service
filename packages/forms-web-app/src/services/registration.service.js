const { postRegistration, putComments } = require('../lib/application-api-wrapper');

const postRegistrationData = async (registration_data) => {
    return await postRegistration(registration_data); 
}

const postCommentsData = async (ipRefNo, comments_data) => {
    return await putComments(ipRefNo, comments_data); 
}
module.exports = {
    postRegistrationData,
    postCommentsData
};