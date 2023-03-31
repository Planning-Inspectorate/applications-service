const { marked } = require('marked');

const removeTimetableItemFormatting = (selectedEvent) =>
	marked
		.parse(selectedEvent)
		.match(/<li>(.|\n)*?<\/li>/gm)
		.map((item) => item.replace(/<\/?li>/g, ''));

const formatTimetableItems = ({ description }) =>
	removeTimetableItemFormatting(description).map((deadlineItem, index) => ({
		value: `${index}`,
		text: deadlineItem
	}));

module.exports = {
	removeTimetableItemFormatting,
	formatTimetableItems
};
