const { projectStages } = require('../../../../utils/project-stages');

projectStages;

const projectListMapper = (projectList) => {
	return projectList.map((project) => ({
		caseRef: project.CaseReference,
		projectName: project.ProjectName,
		promoterName: project.PromoterName,
		stage: projectStages[project.Stage]
	}));
};

const getPageData = (projectList) => ({
	projectList: projectListMapper(projectList)
});

module.exports = {
	getPageData
};
