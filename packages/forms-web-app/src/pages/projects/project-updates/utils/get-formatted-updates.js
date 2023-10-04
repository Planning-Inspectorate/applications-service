const { formatProjectUpdate } = require('../../utils/format-project-update');

const getFormattedUpdates = (updates) => updates.map((update) => formatProjectUpdate(update));

module.exports = { getFormattedUpdates };
