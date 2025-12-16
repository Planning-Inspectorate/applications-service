import L from 'leaflet';

/** @typedef {Object} ProjectProperties - Project data properties
 * @property {string} projectName - Project name
 * @property {string} caseRef - Case reference
 * @property {string} stage - Project stage
 * @property {string} projectType - Type of project
 * @property {string} region - Project region
 * @property {string} [dateOfDCOSubmission] - Submission date
 * @property {string} [dateOfDCOAcceptance] - Acceptance date
 */

/**
 * Stage to color mapping using GOV.UK design system
 */
const STAGE_COLORS = {
	'Pre-application': 'govuk-tag--green',
	Acceptance: 'govuk-tag--turquoise',
	'Pre-examination': 'govuk-tag--blue',
	Examination: 'govuk-tag--purple',
	Recommendation: 'govuk-tag--yellow',
	Decision: 'govuk-tag--pink',
	Decided: 'govuk-tag--light-blue',
	'Post-decision': 'govuk-tag--grey',
	Withdrawn: 'govuk-tag--orange',
	Unknown: 'govuk-tag--dark-grey',
	Custom: 'govuk-tag--red'
};

/**
 * Creates a marker icon based on project stage
 * @param {string} stage - Project stage name
 * @returns {L.DivIcon} Leaflet div icon with GOV.UK styling
 */
export function createMarkerIcon(stage) {
	// Determine tag class based on stage
	// const tagClass = STAGE_COLORS[stage] || STAGE_COLORS.Unknown;

	const tagClass = STAGE_COLORS.Custom;
	console.info(`${stage} mapped to tag class ${tagClass}`);
	return L.divIcon({
		className: 'project-marker',
		html: `<div class="govuk-tag ${tagClass} project-marker-icon"></div>`,
		iconSize: [16, 16],
		iconAnchor: [8, 8]
	});
}

/**
 * Creates HTML content for single marker popup matching cluster style
 * @param {ProjectProperties} properties - Project properties
 * @returns {string} HTML content for popup
 */
export function createPopupContent(properties) {
	const {
		projectName,
		caseRef,
		stage,
		projectType,
		region,
		dateOfDCOSubmission,
		dateOfDCOAcceptance
	} = properties;
	// stage is used in the template below

	return `
		<div class="cluster-popup-container"
			 data-project-name="${projectName}"
			 data-case-ref="${caseRef}"
			 data-stage="${stage}"
			 data-project-type="${projectType}"
			 data-region="${region}"
			 data-submission-date="${dateOfDCOSubmission || ''}"
			 data-acceptance-date="${dateOfDCOAcceptance || ''}">
			<h2 class="cluster-popup-header">1 project selected</h2>
			<table class="cluster-popup-table">
				<tr class="cluster-popup-row">
					<td class="cluster-popup-cell-name">
						<a href="/projects/${caseRef}" class="cluster-popup-link">${projectName}</a>
					</td>
					<td class="cluster-popup-cell-stage">
						${stage}
					</td>
				</tr>
			</table>
		</div>
	`;
}
