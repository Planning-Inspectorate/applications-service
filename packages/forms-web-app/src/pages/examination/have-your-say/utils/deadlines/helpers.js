const { marked } = require('marked');
const removeDeadlineFormatting = (selectedEvent) =>
	selectedEvent.match(/<li>(.|\n)*?<\/li>/gm).map((item) => item.replace(/<\/?li>/g, ''));

const formatDeadlineItems = ({ description }) => {
	const selectedEvent = marked.parse(description);
	return removeDeadlineFormatting(selectedEvent).map((deadlineItem, index) => ({
		value: `${index}`,
		text: deadlineItem
	}));
};

module.exports = {
	removeDeadlineFormatting,
	formatDeadlineItems
};
