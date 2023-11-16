const { formatProjectUpdate } = require('../../_utils/format-project-update');

const getFormattedUpdates = (updates) => updates.map((update) => formatProjectUpdate(update));

module.exports = { getFormattedUpdates };
