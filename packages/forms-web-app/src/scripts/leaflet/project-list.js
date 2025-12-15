const parseProjectData = (properties) => {
	const fileName = properties.projectName || '';
	const [projectCode, stageWithExt] = fileName.split('_');

	return {
		name: projectCode || 'Unknown Project',
		stage: stageWithExt ? stageWithExt.replace('.zip', '') : 'Unknown Stage',
		reference: properties.caseReference || projectCode || ''
	};
};

export const showProjectList = (features) => {
	const projectCount = features.length;
	const projectListContainer = document.getElementById('project-list');

	if (!projectListContainer) {
		console.error('Project list container not found');
		return;
	}

	// Show the container and populate it
	projectListContainer.style.display = 'block';
	projectListContainer.innerHTML = `
		<h3 class="govuk-heading-m">${projectCount} project${projectCount !== 1 ? 's' : ''} selected</h3>
		<ul class="govuk-list">
			${features
				.map((feature) => {
					const project = parseProjectData(feature.properties);

					return `
					<li class="govuk-!-margin-bottom-2">
						<a class="govuk-link" href="/projects/${project.reference}">${project.name}</a>
						<br>
						<span class="govuk-body-s">Stage: ${project.stage}</span>
					</li>
				`;
				})
				.join('')}
		</ul>
	`;
};
