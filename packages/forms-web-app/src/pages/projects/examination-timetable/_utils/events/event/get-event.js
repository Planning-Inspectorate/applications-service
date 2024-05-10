const { eventViewModel } = require('./event-view-model');

const getEvent = (event, i18n) => eventViewModel(event, i18n);

module.exports = { getEvent };
