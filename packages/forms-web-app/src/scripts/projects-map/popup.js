import Popup from 'ol-ext/src/overlay/Popup.js';

/** Creates an ol-ext Popup overlay. */
export function createPopup() {
	return new Popup({
		popupClass: 'default',
		closeBox: true,
		positioning: 'auto',
		autoPan: { animation: { duration: 250 } }
	});
}

function formatPopupText(count, popupText) {
	const text = count === 1 ? popupText.projectSelected : popupText.projectsSelected;
	return `${count} ${text}`;
}

/** Generates popup HTML from an array of project objects. */
export function renderPopupHTML(projects, popupText) {
	const count = projects.length;
	const formattedPopupText = formatPopupText(count, popupText);
	const rows = projects
		.map(({ caseReference, projectName, stage }) => {
			return `<tr class="cluster-popup-row">
				<td class="cluster-popup-cell-name">
					<a href="/projects/${caseReference}" class="govuk-link cluster-popup-link">${
				projectName || caseReference
			}</a>
				</td>
				<td class="cluster-popup-cell-stage">${stage || ''}</td>
			</tr>`;
		})
		.join('');

	return `<div class="cluster-popup-container">
			<h2 class="cluster-popup-header">${formattedPopupText}</h2>
			<table class="cluster-popup-table">${rows}</table>
		</div>`;
}

/** Shows a popup at the given coordinate with project info from the features. */
export function showProjectPopup(popup, features, coordinate, popupText) {
	const projects = features.map((f) => {
		const { caseReference, projectName, stage } = f.getProperties();
		return { caseReference, projectName, stage };
	});

	const html = renderPopupHTML(projects, popupText);
	popup.show(coordinate, html);
}
