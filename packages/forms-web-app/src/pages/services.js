const { getProjectUpdates } = require('../lib/application-api-wrapper');

const getProjectUpdatesData = async (caseRef) => {
	const response = await getProjectUpdates(caseRef);

	if (response.resp_code !== 200) throw new Error('Project updates response status not 200');

	return response.data.updates;
};

module.exports = {
	getProjectUpdatesData
};
