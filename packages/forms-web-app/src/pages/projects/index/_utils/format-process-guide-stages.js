const getProcessGuideStageHtml = (processGuideStage) => {
	let processGuideHtml = '';

	const { content, linkText, url } = processGuideStage;

	const contentItems = [content].flat();

	contentItems.forEach(
		(contentItem) =>
			(processGuideHtml = `${processGuideHtml}<p class="govuk-body">${contentItem}</p>`)
	);

	return `${processGuideHtml}<a class="govuk-link" href="${url}">${linkText}</a>`;
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
