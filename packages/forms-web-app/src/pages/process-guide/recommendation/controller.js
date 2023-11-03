const view = 'process-guide/recommendation/view.njk';

const getRecommendationController = (req, res) => res.render(view);

module.exports = { getRecommendationController };
