module.exports = async (context, message) => {
	context.bindings.document = {
		...message,
		modifiedAt: new Date()
	};
};
