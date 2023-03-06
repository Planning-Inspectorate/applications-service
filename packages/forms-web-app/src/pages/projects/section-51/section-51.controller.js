function getSection51(req, res) {
	return res.render('projects/section-51/index.njk', {
		title: 'Section 51 Advice'
	});
}

module.exports = {
	getSection51
};
