const slugify = require('slugify');
const config = require('../config');

const slugifyConfig = {
	remove: /[()']/g,
	lower: true
};

/**
 * Converts text into a URL-safe string aka "slug".
 * Uses slugify library for main conversion but applies some PINS specific rules first;
 * 1) Replaces forward slashes with hyphens and 2) Removes ampersands
 * @param text
 * @returns {string | *}
 */
const slugifyText = (text) => {
	return slugify(text.replace(/\//g, '-').replace(/&/g, ''), slugifyConfig);
};

/**
 * Generates a link to PINS' National Infrastructure site (NSIP) for a given project
 * e.g. For project data with name "Longfield Solar Farm" and region "Eastern", the following link is generated:
 * https://infrastructure.planninginspectorate.gov.uk/projects/eastern/longfield-solar-farm/
 * Handles special characters by either replacing with hyphens or removing altogether.
 * The base URL of the link is taken from the value of config.server.nsipBaseUrl.
 * @param projectData Object containing project data, specifically the fields ProjectName and Region
 * @returns {string} Link to project page on NI site
 */
const nsipProjectLink = (projectData) => {
	const region = slugifyText(projectData.Region);
	const projectName = slugifyText(projectData.ProjectName);
	return `${config.server.nsipBaseUrl}/projects/${region}/${projectName}`;
};

module.exports = {
	nsipProjectLink
};
