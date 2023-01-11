const projectPromoterNameId = 'promoterName';

const getProjectPromoterName = (session) => {
	const projectPromoterName = session[projectPromoterNameId];
	if (!projectPromoterName) throw new Error('Project promoter name not found');
	return projectPromoterName;
};

const setProjectPromoterName = (session, projectPromoterName) =>
	(session[projectPromoterNameId] = projectPromoterName);

module.exports = { getProjectPromoterName, setProjectPromoterName };
