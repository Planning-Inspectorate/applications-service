const axios = require('axios');

module.exports = async (context, message) => {
	context.log(
		`invoking nsip-project-update-unpublish function with message: ${JSON.stringify(message)}`
	);

	await axios.delete(
		`${process.env['APPLICATIONS_SERVICE_API_URL']}/api/v1/project-updates/${message.id}`
	);
};
