const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InterestedParty extends Model {}
  InterestedParty.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      caseref: DataTypes.STRING,
      behalf: DataTypes.TEXT,
      mename: DataTypes.TEXT,
      mebuild: DataTypes.TEXT,
      mestreet: DataTypes.TEXT,
      metown: DataTypes.TEXT,
      mecounty: DataTypes.TEXT,
      mecode: DataTypes.TEXT,
      mecountry: DataTypes.TEXT,
      memail: DataTypes.TEXT,
      mephone: DataTypes.TEXT,
      orgname: DataTypes.TEXT,
      contactname: DataTypes.TEXT,
      contactjob: DataTypes.TEXT,
      orgbuild: DataTypes.TEXT,
      orgstreet: DataTypes.TEXT,
      orgtown: DataTypes.TEXT,
      orgcounty: DataTypes.TEXT,
      orgcode: DataTypes.TEXT,
      orgcountry: DataTypes.TEXT,
      orgmail: DataTypes.TEXT,
      orgphone: DataTypes.TEXT,
      youname: DataTypes.TEXT,
      youbuild: DataTypes.TEXT,
      youstreet: DataTypes.TEXT,
      youtown: DataTypes.TEXT,
      youcounty: DataTypes.TEXT,
      youcode: DataTypes.TEXT,
      youcountry: DataTypes.TEXT,
      youmail: DataTypes.TEXT,
      youphone: DataTypes.TEXT,
      agname: DataTypes.TEXT,
      agorgname: DataTypes.TEXT,
      agbuild: DataTypes.TEXT,
      agstreet: DataTypes.TEXT,
      agtown: DataTypes.TEXT,
      agcounty: DataTypes.TEXT,
      agcode: DataTypes.TEXT,
      agcountry: DataTypes.TEXT,
      agmail: DataTypes.TEXT,
      agphone: DataTypes.TEXT,
      therep: DataTypes.TEXT,
      validated: DataTypes.TIME,
      emailed: DataTypes.TIME,
      exported: DataTypes.TIME,
      web_ref: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'InterestedParty',
      tableName: 'wp_ipc_relreps',
      timestamps: false,
    }
  );

  InterestedParty.removeAttribute('id');
  return InterestedParty;
};
