/**
 * Wraps an async {RequestHandler} function and catches any unresolved Promises.
 * Allows uncaught exceptions originating from an async function to be caught by
 * the default Express error handler.
 * @param route {function(Request, Response, NextFunction): Promise<void>}
 * @returns {function(Request, Response, NextFunction)}
 */
const asyncRoute = (route) => {
	return (req, res, next) => route(req, res, next).catch(next);
};

module.exports = { asyncRoute };
