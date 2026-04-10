import { getUpdatesURL } from '../../_utils/get-updates-url.js';
import { journeyId } from '../config.js';

export const getUpdatesFormURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${journeyId}`;
};
