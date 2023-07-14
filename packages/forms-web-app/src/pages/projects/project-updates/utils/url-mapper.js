exports.createUpdatesPageUrl = (caseRef, urlSubdirectory) => {
	if (caseRef && urlSubdirectory) return `/projects/${caseRef}/get-updates/${urlSubdirectory}`;
};
