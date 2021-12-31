const { VIEW } = require('../lib/views');
const { getAppData } = require('../services/application.service');

exports.getRecommendations = async (req, res) => {
  const response = await getAppData(req.params.case_ref);
  if (response.resp_code === 200) {
    const appData = response.data;

    res.render(VIEW.RECOMMENDATIONS, {
      appData,
    });
  }
};
