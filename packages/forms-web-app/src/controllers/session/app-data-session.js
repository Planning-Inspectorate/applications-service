const config = require('../../config');

const getProjectEmailAddress = (session) => {
	return session.ProjectEmailAddress || config.pinsContactDetails.enquiriesEmailAddress;
};

module.exports = {
	getProjectEmailAddress
};
