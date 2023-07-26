const excludedProperties = [
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
	context.log(`invoking nsip-project function with message: ${JSON.stringify(message)}`);
	context.bindings.project = parseMessage(message);
};

const parseMessage = (message) => {
	let output = {
		modifiedAt: new Date()
	};

	for (const [key, value] of Object.entries(message)) {
		if (!excludedProperties.includes(key)) {
			output[key] = Array.isArray(value) ? value.join(',') : value;
		}
	}

	return output;
};
