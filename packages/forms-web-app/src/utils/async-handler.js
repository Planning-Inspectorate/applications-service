// an async handler type, since RequestHandler is sync and does not return a Promise
// adapted from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/8e274af6ed512811d15426cca3b946cd9227a255/types/express-serve-static-core/index.d.ts#L52-L65

export function asyncHandler(requestHandler) {
	// supports async or sync handlers
	return (request, response, next) => {
		try {
			const p = requestHandler(request, response, next);
			if (p instanceof Promise) {
				p.catch(next);
			}
		} catch (e) {
			// in case a sync function is passed in
			next(e);
		}
	};
}
