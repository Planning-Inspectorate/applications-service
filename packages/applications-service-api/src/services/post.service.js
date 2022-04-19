// const { Op } = require('sequelize');
const db = require('../models');

const getPostsBy = async (type, status, tag) => {
  const posts = await db.sequelize.query(
    'SELECT * FROM ipclive.wp_posts p inner join ipclive.wp_term_relationships r on r.object_id = p.id inner join ipclive.wp_terms t on r.term_taxonomy_id = t.term_id WHERE p.post_type  = (:type) and p.post_status = (:status) and t.name = (:tag) order by post_date desc',
    {
      replacements: { type, status, tag },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );

  return posts;
};

module.exports = {
  getPostsBy,
};
