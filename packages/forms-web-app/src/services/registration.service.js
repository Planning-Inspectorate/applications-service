const { postSelfRegistration } = require('../lib/application-api-wrapper');

const postSelfRegistrationData = async (registration_data) => {
    return {ipRefNo: "ABC123"};
    // const response = await postSelfRegistration(registration_data);
    // return response;
}

module.exports = {
    postSelfRegistrationData,
};