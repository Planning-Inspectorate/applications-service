const view = 'projects/project-updates/index.njk';
const getProjectUpdates = async (req, res) => {
	return res.render(view, {
		title: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`
	});
};

module.exports = {
	getProjectUpdates
};
