const {
	routesConfig: {
		examination: {
			pages: { noOpenDeadlines }
		}
	}
} = require('../../../routes/config');

const view = 'examination/no-open-deadlines/view.njk';

const getNoOpenDeadlines = async (req, res) => {
	const projectName = 'Test project name'; // TODO get from session
	const pageTitle = noOpenDeadlines.pageTitle;
	const title = noOpenDeadlines.title;

	res.render(view, {
		projectName,
		pageTitle,
		title
	});
};

module.exports = {
	getNoOpenDeadlines
};
