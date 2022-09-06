const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Timetable extends Model {}
	Timetable.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unique_id: DataTypes.STRING,
			case_reference: DataTypes.STRING,
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			date_of_event: DataTypes.DATE,
			timetable_type: DataTypes.STRING,
			type_of_event: DataTypes.STRING,
			location: DataTypes.STRING,
			date_created: DataTypes.STRING,
			date_last_modified: DataTypes.STRING,
			dateTimeDeadlineStart: DataTypes.DATE,
			sourceSystem: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Timetable',
			tableName: 'wp_ipc_timetables'
		}
	);

	Timetable.removeAttribute('createdAt');
	Timetable.removeAttribute('updatedAt');

	return Timetable;
};
