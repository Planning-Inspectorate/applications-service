const { postSelfRegistration, putComments } = require('../lib/application-api-wrapper');

const postSelfRegistrationData = async (registration_data) => {
    return await postSelfRegistration(registration_data); 
}

const postCommentsData = async (ipRefNo, comments_data) => {
    return await putComments(ipRefNo, comments_data); 
}
module.exports = {
    postSelfRegistrationData,
    postCommentsData
};