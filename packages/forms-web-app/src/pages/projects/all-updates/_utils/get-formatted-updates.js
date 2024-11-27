const { formatProjectUpdate } = require('../../_utils/format-project-update');

const getFormattedUpdates = (updates, lang) =>
	updates.map((update) => formatProjectUpdate(update, lang));

module.exports = { getFormattedUpdates };
