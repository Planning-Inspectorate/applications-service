const { marked } = require('marked');
const { collapse } = require('string-collapse-white-space');

const removeTimetableItemFormatting = (description) => {
	const descriptionWithoutSpacing = collapse(description.replace(/\n|\r/g, '')).result;
	const descriptionFormattedForList = descriptionWithoutSpacing.replace(/\*/g, '\n* ');

	return marked
		.parse(descriptionFormattedForList)
		.match(/<li>(.|\n)*?<\/li>/gm)
		.map((item) => item.replace(/<\/?li>/g, '').trim());
};

const formatTimetableItems = ({ description }) =>
	removeTimetableItemFormatting(description).map((deadlineItem, index) => ({
		value: `${index}`,
		text: deadlineItem
	}));

module.exports = {
	removeTimetableItemFormatting,
	formatTimetableItems
};
