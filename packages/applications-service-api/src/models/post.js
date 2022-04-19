const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_author: DataTypes.INTEGER,
      post_date: DataTypes.TIME,
      post_date_gmt: DataTypes.TIME,
      post_content: DataTypes.TEXT,
      post_title: DataTypes.TEXT,
      post_excerpt: DataTypes.TEXT,
      post_status: DataTypes.TEXT,
      comment_status: DataTypes.TEXT,
      ping_status: DataTypes.TEXT,
      post_password: DataTypes.TEXT,
      post_name: DataTypes.TEXT,
      to_ping: DataTypes.TEXT,
      pinged: DataTypes.TEXT,
      post_modified: DataTypes.TIME,
      post_modified_gmt: DataTypes.TIME,
      post_content_filtered: DataTypes.TEXT,
      post_parent: DataTypes.INTEGER,
      guid: DataTypes.TEXT,
      menu_order: DataTypes.INTEGER,
      post_type: DataTypes.TEXT,
      post_mime_type: DataTypes.TEXT,
      comment_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'wp_posts',
      timestamps: false,
    }
  );

  Post.removeAttribute('id');
  return Post;
};
