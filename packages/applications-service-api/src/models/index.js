const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const {
	backOfficeIntegration: { getAllApplications }
} = require('../lib/config');
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

// Training env will only use BO and cannot connect to NI, so we use a mock DB to avoid connection errors
if (getAllApplications === 'BO') {
	console.log('Training environment - using mock DB for NI');
	db = new SequelizeMock();

	modelsToMock.forEach((name) => {
		const modelMock = db.define(name, {});
		db[name] = modelMock;
	});
} else {
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
}

db.Sequelize = Sequelize;

module.exports = db;
