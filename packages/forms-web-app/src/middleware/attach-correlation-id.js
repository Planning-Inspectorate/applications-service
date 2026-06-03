const appInsights = require('applicationinsights');

function attachCorrelationId(req, res, next) {
	const context = appInsights.getCorrelationContext();
	const operationId = context?.operation.id ?? null;

	if (operationId) {
		res.locals.correlationId = operationId;
		res.setHeader('x-app-insights-correlation-id', operationId);
	}

	next();
}

module.exports = {
	attachCorrelationId
};
