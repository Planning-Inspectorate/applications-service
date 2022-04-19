const logger = require('../lib/logger');

const { getPostsBy } = require('../services/post.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getBanners(req, res) {
    logger.debug(`Retrieving banners`);
    const { tag } = req.params;
    const type = 'ipc_project_update';
    const status = 'publish';
    try {
      const banners = await getPostsBy(type, status, tag);

      if (!banners.length) {
        throw ApiError.noBannersFound();
      }

      logger.debug(`Banners retrieved`);
      res.status(200).send(
        // eslint-disable-next-line camelcase
        banners.map(({ post_date, post_content }) => ({ date: post_date, content: post_content }))
      );
    } catch (e) {
      if (e instanceof ApiError) {
        logger.debug(e.message);
        res.status(e.code).send({ code: e.code, errors: e.message.errors });
        return;
      }
      logger.error(e.message);
      res.status(500).send(`Problem getting banners`);
    }
  },
};
