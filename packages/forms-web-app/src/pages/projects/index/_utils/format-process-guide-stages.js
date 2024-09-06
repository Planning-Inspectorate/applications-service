const getProcessGuideStageHtml = (processGuideStage) => {
	let processGuideHtml = '';
	let processGuideLink = '';

	const { content, linkText, url } = processGuideStage;

	const contentItems = [content].flat();

	contentItems.forEach(
		(contentItem) =>
			(processGuideHtml = `${processGuideHtml}<p class="govuk-body">${contentItem}</p>`)
	);

	if (url && linkText) {
		processGuideLink = `<a class="govuk-link" href="${url}">${linkText}</a>`;
	}

	return `${processGuideHtml}${processGuideLink}`;
};

const formatProcessGuideStages = (processGuideStages) => {
	const processGuideStagesCopy = JSON.parse(JSON.stringify(processGuideStages));

	Object.keys(processGuideStagesCopy).forEach((processGuideStageKey) => {
		const processGuideStage = processGuideStagesCopy[processGuideStageKey];

		processGuideStagesCopy[processGuideStageKey] = {
			html: getProcessGuideStageHtml(processGuideStage),
			title: processGuideStage.title
		};
	});

	return processGuideStagesCopy;
};

module.exports = { formatProcessGuideStages };
