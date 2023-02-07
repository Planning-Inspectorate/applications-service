const { isPastEvent } = require('../event/helpers');

const sortEvents = (events) => {
	const past = [];
	const upcoming = [];

	events.forEach((event) => {
		if (isPastEvent(event)) past.push(event);
		else upcoming.push(event);
	});

	return {
		past,
		upcoming
	};
};

module.exports = { sortEvents };
