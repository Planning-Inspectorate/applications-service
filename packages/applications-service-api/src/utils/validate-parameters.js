// const validateParameters = (...args) => {
// 	if (!args || args.length === 0 || Array.isArray(args)) {
// 		return false;
// 	}

// 	const invalidParams = {};

// 	for (const [index, { expectedType, paramValue }] of args.entries()) {
// 		if (Object.keys(invalidParams).length !== 0) {
// 			return false;
// 		}

// 		let validateType;

// 		switch (expectedType) {
// 			case 'array':
// 				validateType = () => Array.isArray(paramValue);
// 				break;

// 			case 'string':
// 				validateType = () => typeof paramValue === 'string';
// 				break;

// 			case 'boolean':
// 				validateType = () => typeof paramValue === 'boolean';
// 				break;

// 			case 'number':
// 				validateType = () => typeof paramValue === 'number';
// 				break;

// 			case 'object':
// 				validateType = () => typeof paramValue === 'object' && !Array.isArray(paramValue);
// 				break;

// 			default:
// 				break;
// 		}

// 		if (!paramValue || !validateType()) {
// 			invalidParams[index] = { paramValue, expectedType };
// 			const receivedValue = invalidParams[index]['paramValue'];

// 			console.error(
// 				`validateParameters function error! paramValue: ${JSON.stringify(
// 					paramValue
// 				)}, expected to be: ${JSON.stringify(expectedType)} but received: ${JSON.stringify(
// 					receivedValue
// 				)} instead.`
// 			);
// 			return false;
// 		}
// 	}

// 	if (Object.keys(invalidParams).length === 0) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// const validateTypes = (type) => {
// 	if (!type || typeof type !== 'string') {
// 		return;
// 	}

// 	const types = ['array', 'string', 'boolean', 'number', 'object'];

// 	for (const currentType of types) {
// 		const regex = new RegExp(currentType, 'i');
// 		if (regex.test(type)) {
// 			return currentType;
// 		}
// 	}

// 	return;
// };

// module.exports = { validateParameters, validateTypes };
