const { status } = require('../../utils/status');
const { VIEW } = require('../../lib/views');
const { getAppList } = require('../../services/application.service');

function getJsonDetails(app) {
	const item = {};

	item.ProjectName = app.ProjectName;
	item.CaseReference = app.CaseReference;
	item.PromoterName = app.PromoterName;
	item.Stage = status[app.Stage];

	return item;
}

const getProjects = async (req, res) => {
	const response = await getAppList();
	if (response.resp_code === 200) {
		const appList = response.data;
		const noOfProjects = appList.length;
		const requiredAppdata = [];

		for (let i = 0; i < noOfProjects; i += 1) {
			const obj = getJsonDetails(appList[i]);

			requiredAppdata.push(obj);
		}
		res.render(VIEW.PROJECTS.INDEX, { appList: requiredAppdata, noOfProjects });
	}
};

module.exports = {
	getProjects
};
