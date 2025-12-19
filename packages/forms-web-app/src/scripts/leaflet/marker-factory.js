import L from 'leaflet';

/**
 * Stage to color mapping using GOV.UK design system tag classes
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
	Unknown: 'govuk-tag--grey'
};

/**
 * Creates a marker icon based on project stage
 * @param {string} stage - Project stage name
 * @returns {L.DivIcon} Leaflet div icon with GOV.UK styling
 */
export function createMarkerIcon(stage) {
	const tagClass = STAGE_COLORS[stage] || STAGE_COLORS.Unknown;

	return L.divIcon({
		className: 'project-marker',
		html: `<div class="govuk-tag ${tagClass} project-marker-icon"></div>`,
		iconSize: [16, 16],
		iconAnchor: [8, 8]
	});
}

/**
 * Creates HTML content for single marker popup
 * @param {Object} properties - Project properties
 * @returns {string} HTML content for popup
 */
export function createPopupContent(properties) {
	const { projectName, caseRef, stage } = properties;

	return `
		<div class="cluster-popup-container">
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
