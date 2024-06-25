/**
 * This is a temporary file which will be removed once the applications-service-api is updated to only use BO applications.
 * In the meantime while we are merging the applications from BO and NI we need to sort the applications
 * on the API level
 */

const sortApplications = (applications, sort = '+ProjectName') => {
	const direction = sort.startsWith('-') ? 'desc' : 'asc';
	const key = sort.replace(/^[+-]/, '');

	// add initial sort by projectName so missing date fields are sorted by project name
	if (key !== 'ProjectName') {
		applications = applications.sort(sortByStringKeyInObject('ProjectName', 'asc'));
	}

	switch (key) {
		case 'ProjectName':
		case 'PromoterName':
			return applications.sort(sortByStringKeyInObject(key, direction));
		case 'DateOfDCOSubmission':
		case 'ConfirmedDateOfDecision':
			return applications.sort(sortByDateKeyInObject(key, direction));
		case 'Stage':
			return applications.sort(sortByNumberKeyInObject(key, direction));
	}
};

const isNullOrUndefined = (value) => !value && value !== 0;
const sortByNumberKeyInObject = (key, direction) => (a, b) => {
	// defaulting to 1 (pre_application) if the value is null or undefined (but not 0 / draft stage)
	const aValue = isNullOrUndefined(a[key]) ? 1 : a[key];
	const bValue = isNullOrUndefined(b[key]) ? 1 : b[key];

	const difference = aValue - bValue;
	return direction === 'asc' ? difference : -difference;
};

const sortByDateKeyInObject = (key, direction) => (a, b) => {
	const aValue = new Date(a[key]);
	const bValue = new Date(b[key]);
	return direction === 'asc' ? aValue - bValue : bValue - aValue;
};

const sortByStringKeyInObject = (key, direction) => (a, b) => {
	const aValue = a[key]?.toLowerCase();
	const bValue = b[key]?.toLowerCase();
	return direction === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
};

module.exports = sortApplications;
