module.exports = async (context, message) => {
	context.log(`invoking nsip-documents function with message: ${JSON.stringify(message)}`);
	context.bindings.document = {
		...message,
		modifiedAt: new Date()
	};
};
