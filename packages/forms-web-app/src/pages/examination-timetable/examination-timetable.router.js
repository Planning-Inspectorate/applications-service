const { featureFlag } = require('../../config');
const {
	routesConfig: {
		project: { pages, subDirectory }
	}
} = require('../../routes/config');

const examinationTimetable = require('./examination-timetable.controller');
const express = require('express');

const router = express.Router();

if (featureFlag.allowExaminationTimetable) {
	router.get(
		`${subDirectory}${pages.examinationTimetable.route}`,
		examinationTimetable.getExaminationTimetable
	);
	router.post(
		`${subDirectory}${pages.examinationTimetable.route}`,
		examinationTimetable.postExaminationTimetable
	);
}

module.exports = {
	examinationTimetableRouter: router
};
