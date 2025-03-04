const { marked } = require('marked');
const { collapse } = require('string-collapse-white-space');

const removeTimetableItemFormatting = (description) => {
	let deadlineItems = [];

	if (!description) return deadlineItems;

	const descriptionWithoutSpacing = collapse(description.replace(/\n|\r/g, '')).result;
	const descriptionFormattedForList = descriptionWithoutSpacing.replace(/\*/g, '\n* ');

	deadlineItems = marked
		.parse(descriptionFormattedForList)
		.match(/<li>(.|\n)*?<\/li>/gm)
		.map((item) => item.replace(/<\/?li>/g, '').trim())
		//parsing with marked unnecessarily converts some characters to html entities
		//this is a workaround to convert them back
		//TODO: check if deadline items still contain html elements as we might not need to parse this at all
		.map((item) =>
			item
				.replace(/&amp;/g, '&')
				.replace(/&#39;/g, "'")
				.replace(/&quot;/g, '"')
		);

	return deadlineItems;
};

const formatTimetableItems = ({ description, descriptionWelsh }) => {
	const deadlineItemsEnglish = removeTimetableItemFormatting(description);
	const deadlineItemsWelsh = removeTimetableItemFormatting(descriptionWelsh);

	return deadlineItemsEnglish.map((deadlineItem, index) => ({
		value: `${index}`,
		text: deadlineItem,
		textWelsh: deadlineItemsWelsh[index] || null
	}));
};

module.exports = {
	removeTimetableItemFormatting,
	formatTimetableItems
};
