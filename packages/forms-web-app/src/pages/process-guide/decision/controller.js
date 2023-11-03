const view = 'process-guide/decision/view.njk';

const getDecisionController = (req, res) => res.render(view);

module.exports = { getDecisionController };
