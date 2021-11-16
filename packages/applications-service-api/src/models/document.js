const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {}
  Document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dataID: DataTypes.STRING,
      case_reference: DataTypes.STRING,
      Stage: DataTypes.INTEGER,
      type: DataTypes.STRING,
      filter_1: DataTypes.STRING,
      filter_2: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      size: DataTypes.INTEGER,
      mime: DataTypes.STRING,
      path: DataTypes.TEXT,
      status: DataTypes.STRING,
      date_published: DataTypes.DATE,
      deadline_date: DataTypes.DATE,
      personal_name: DataTypes.STRING,
      representative: DataTypes.STRING,
      who_from: DataTypes.STRING,
      doc_reference: DataTypes.STRING,
      author: DataTypes.STRING,
      details: DataTypes.STRING,
      last_modified: DataTypes.STRING,
      date_created: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Document',
      tableName: 'wp_ipc_documents_api',
    }
  );

  Document.removeAttribute('createdAt');
  Document.removeAttribute('updatedAt');

  return Document;
};
