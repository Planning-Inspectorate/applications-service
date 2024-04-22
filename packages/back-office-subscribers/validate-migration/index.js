const axios = require('axios');

module.exports = async (context, req) => {
	const caseReference = req.body.caseReference;
	if (!caseReference) {
		context.res = {
			status: 400,
			body: 'Please pass a caseReference on the request body'
		};
		return;
	}

	context.log(`invoking validate-migration with caseReference: ${caseReference}`);
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/validate-migration/${caseReference}`;

	const response = await axios.get(url);
	context.res = {
		body: response.data
	};
};
