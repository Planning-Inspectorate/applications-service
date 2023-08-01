module.exports = async (context, message) => {
	context.log(`invoking nsip-project-update function with message: ${JSON.stringify(message)}`);
	context.bindings.projectUpdate = {
		projectUpdateId: message.id,
		caseReference: message.caseReference,
		updateDate: message.updateDate,
		updateName: message.updateName,
		updateContentEnglish: message.updateContentEnglish,
		updateContentWelsh: message.updateContentWelsh,
		updateStatus: message.updateStatus,
		modifiedAt: new Date()
	};
};
