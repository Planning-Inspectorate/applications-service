module.exports = async (context, message) => {
	context.log(`Message: ${message}`);
	context.log(`EnqueuedTimeUtc: ${context.bindingData.enqueuedTimeUtc}`);
	context.log(`DeliveryCount: ${context.bindingData.deliveryCount}`);
	context.log(`MessageId: ${context.bindingData.messageId}`);
};
