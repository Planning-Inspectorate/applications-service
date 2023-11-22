const { eventViewModel } = require('./event-view-model');

const getEvent = (event) => eventViewModel(event);

module.exports = { getEvent };
