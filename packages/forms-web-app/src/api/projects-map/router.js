/**
 * Projects Map Router
 *
 * Routes for retrieving project data in GeoJSON format for map display
 *
 * Usage:
 *   GET /api/projects-map
 *   Returns: GeoJSON FeatureCollection with all projects
 */

const express = require('express');
const { getProjectsMap } = require('./controller');

const projectsMapRouter = express.Router();

projectsMapRouter.get('/projects-map', getProjectsMap);

module.exports = { projectsMapRouter };
