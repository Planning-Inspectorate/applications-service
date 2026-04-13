import { getRegisterURL } from '../../_utils/get-register-url.js';
import { journeyId } from '../config.js';

export const getRegisterFormURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${journeyId}`;
};
