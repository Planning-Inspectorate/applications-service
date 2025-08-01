const constructUrlForBlobStoreDocs = () => {
	const environment = process.env.NODE_ENV;
	let url;
	let subDomain = 'https://back-office-applications-docs-';
	let domain = '.planninginspectorate.gov.uk/';
	switch (environment) {
		case 'prod':
			url = `https://nsip-documents${domain}`;
			break;
		case 'test':
		case 'dev':
			url = `${subDomain}${environment}${domain}`;
			break;
		case 'training':
			url = `${subDomain}train${domain}`;
			break;
		default:
			url = `${subDomain}dev${domain}`;
			break;
	}
	return url;
};

module.exports = constructUrlForBlobStoreDocs;
