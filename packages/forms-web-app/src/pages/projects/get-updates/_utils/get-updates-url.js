import { getProjectsURL } from '../../_utils/get-projects-url.js';
import { getUpdatesRoute } from '../config.js';

export const getUpdatesURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);
	return `${projectsURL}/${getUpdatesRoute}`;
};
