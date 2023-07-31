const { getAppData } = require('../../../../services/application.service');
const getApplicationData = async (case_ref) => {
	const { data, resp_code } = await getAppData(case_ref);
	if (resp_code !== 200) throw new Error('Application response status not 200');

	return {
		projectName: data.ProjectName,
		proposal: data.Proposal,
		summary: data.Summary,
		webAddress: data.WebAddress,
		dateOfNonAcceptance: data.dateOfNonAcceptance
	};
};

module.exports = {
	getApplicationData
};
