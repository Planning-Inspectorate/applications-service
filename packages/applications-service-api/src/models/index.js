const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(`../database/config/config`);
const SequelizeMock = require('sequelize-mock');

const modelsToMock = [
	'Advice',
	'Document',
	'InterestedParty',
	'Project',
	'Representation',
	'Submission',
	'Timetable'
];

let db = {};
const isLocalEnv = process.env.NODE_ENV.toLowerCase() === 'local';

//local to use NI DB until we migrate the case data
//non-local environments to use a mock database while we migrate the case data and the e2e tests that use it
if (isLocalEnv) {
	console.log('Initialising local NI DB connection...');
	const sequelize = new Sequelize(config.database, config.username, config.password, config);
	fs.readdirSync(__dirname)
		.filter((file) => {
			return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
		})
		.forEach((file) => {
			const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
			db[model.name] = model;
		});

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	db.sequelize = sequelize;
} else {
	console.log('Using mock NI DB');
	db = new SequelizeMock();

	modelsToMock.forEach((name) => {
		db[name] = db.define(name, {});
	});
}

db.Sequelize = Sequelize;

module.exports = db;
