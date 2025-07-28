const projectsPrefix = '/projects/';

// project paths are in the form /projects/{region}/{name}
const projectsRegex = new RegExp(/^\/projects\/(?<suffix>[A-Za-z0-9-]*\/[A-Za-z0-9-]*)\/?$/);

/**
 * Determine if the given path looks like a project link
 *
 * @param {string} path
 * @returns {boolean}
 */
export function isProjectLink(path) {
	return path.startsWith(projectsPrefix);
}

/**
 * Determine the URL to redirect to for the given project path.
 * Returns null if the project cannot be redirected.
 *
 * @param {string} path
 * @param {import('./index').EnvConfig} env
 * @param {string[]} redirectAllowedCaseReferences
 * @returns {string|null}
 */
export function getProjectRedirect(path, env, redirectAllowedCaseReferences) {
	const match = projectsRegex.exec(path);

	if (!match) {
		return null;
	}

	const { suffix } = match.groups;

	if (!suffix) {
		return null;
	}

	const projects = env.projectRedirects;
	if (Object.hasOwn(projects, suffix) && redirectAllowedCaseReferences.includes(projects[suffix])) {
		return `${env.frontOfficeUrl}/projects/${projects[suffix]}`;
	}

	return null;
}
