const {
	getProjectUpdates: getProjectUpdatesData
} = require('../../../../lib/application-api-wrapper');

const getProjectUpdates = async (caseRef) => {
	const {
		data: { updates },
		resp_code
	} = await getProjectUpdatesData(caseRef);
	if (resp_code !== 200) throw new Error('oops');

	return updates;
};

module.exports = {
	getProjectUpdates
};
