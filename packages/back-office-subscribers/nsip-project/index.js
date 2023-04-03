const excludedProperties = [
	'caseId',
	'operationsLeadId',
	'operationsManagerId',
	'caseManagerId',
	'nsipOfficerIds',
	'nsipAdministrationOfficerIds',
	'leadInspectorId',
	'inspectorIds',
	'environmentalServicesOfficerId',
	'legalOfficerId',
	'applicantIds',
	'interestedPartyIds'
];

module.exports = async (context, message) => {
	context.bindings.project = parseMessage(message);
};

const parseMessage = (message) => {
	let output = {};

	for (const [key, value] of Object.entries(message)) {
		if (!excludedProperties.includes(key)) {
			output[key] = Array.isArray(value) ? value.join(',') : value;
		}
	}

	return output;
};
