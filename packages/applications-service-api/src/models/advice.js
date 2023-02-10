const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Advice extends Model {}

	Advice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			AdviceID: DataTypes.STRING,
			// case_reference: DataTypes.STRING,
			// stage: { type: DataTypes.INTEGER, field: 'Stage' },
			// type: DataTypes.STRING,
			// filter_1: DataTypes.STRING,
			// filter_2: DataTypes.STRING,
			// category: DataTypes.STRING,
			// description: DataTypes.TEXT,
			// size: DataTypes.INTEGER,
			// mime: DataTypes.STRING,
			// path: DataTypes.TEXT,
			// status: DataTypes.STRING,
			DateAdviceGiven: DataTypes.DATE
			// deadline_date: DataTypes.DATE,
			// personal_name: DataTypes.STRING,
			// representative: DataTypes.STRING,
			// who_from: DataTypes.STRING,
			// doc_reference: DataTypes.STRING,
			// author: DataTypes.STRING,
			// details: DataTypes.STRING,
			// last_modified: DataTypes.STRING,
			// date_created: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Advice',
			tableName: 'wp_ipc_advice'
		}
	);

	Advice.removeAttribute('createdAt');
	Advice.removeAttribute('updatedAt');

	return Advice;
};
