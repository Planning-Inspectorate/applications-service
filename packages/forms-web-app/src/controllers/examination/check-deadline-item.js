const {
	routesConfig: {
		examination: {
			pages: { checkDeadlineItem }
		}
	}
} = require('../../routes/config');

const pageData = {
	id: checkDeadlineItem.id,
	pageTitle: checkDeadlineItem.name,
	title: checkDeadlineItem.name
};

const getCheckDeadlineItem = (req, res) => {
	res.render(checkDeadlineItem.view, pageData);
};

const postCheckDeadlineItem = (req, res) => {
	res.render(checkDeadlineItem.view, pageData);
};

module.exports = {
	getCheckDeadlineItem,
	postCheckDeadlineItem
};
