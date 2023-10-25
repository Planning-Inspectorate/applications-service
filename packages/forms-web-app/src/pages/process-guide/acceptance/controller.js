const view = 'process-guide/acceptance/view.njk';

const getAcceptanceController = (req, res) => res.render(view);

module.exports = { getAcceptanceController };
