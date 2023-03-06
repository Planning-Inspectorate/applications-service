const { getAppData } = require('../../../services/application.service');
const { formatDate } = require('../../../utils/date-utils');
const { titleCase } = require('../../../utils/string-case');
const { searchRepresentations } = require('../../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../../lib/pagination');
const { getRepresentation } = require('../../../services/representation.service');
const { featureHideLink } = require('../../../config');

const { hideProjectInformationLink, hideAllExaminationDocumentsLink } = featureHideLink;

const representationsView = 'projects/relevant-representations/representations.njk';
const representationView = 'projects/relevant-representations/representation.njk';

exports.getRepresentations = async (req, res) => {
	const { searchTerm, type } = req.query;
	const applicationResponse = await getAppData(req.params.case_ref);

	if (applicationResponse.resp_code === 404) {
		return res.status(404).render('error/not-found');
	}

	const commentsTypeFilterItems = [];

	const params = {
		applicationId: req.params.case_ref,
		page: '1',
		...req.query
	};
	let queryUrl = '';
	if (params.searchTerm) {
		queryUrl = `&searchTerm=${params.searchTerm}`;
	}
	if (params.type) {
		const typeQueryParams = params.type instanceof Array ? [...params.type] : [params.type];
		queryUrl = `${queryUrl}&type=${typeQueryParams.join('&type=')}`;
	}
	const representationsResponse = await searchRepresentations(params);
	if (representationsResponse.resp_code === 404) {
		return res.status(404).render('error/not-found');
	}

	const respData = representationsResponse.data;
	const { representations, filters } = respData;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);
	const { typeFilters } = filters;

	typeFilters.forEach((typeFilter) => {
		const typeFilterName = titleCase(typeFilter.name);
		commentsTypeFilterItems.push({
			text: `${typeFilterName} (${typeFilter.count})`,
			value: typeFilterName,
			checked: type && type.includes(typeFilterName)
		});
	});

	representations.forEach((repesentation) => {
		repesentation.DateRrepReceived = formatDate(repesentation.DateRrepReceived.split('T')[0]);
		repesentation.RepFrom = titleCase(repesentation.RepFrom);
	});

	res.render(representationsView, {
		projectName: applicationResponse.data.ProjectName,
		caseRef: applicationResponse.data.CaseReference,
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		representations,
		paginationData,
		pageOptions,
		searchTerm,
		queryUrl,
		commentsTypeFilterItems
	});
};

exports.getRepresentation = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	const representationResponse = await getRepresentation(req.params.id);

	if (applicationResponse.resp_code === 404 || representationResponse.resp_code === 404) {
		return res.status(404).render('error/not-found');
	}

	res.render(representationView, {
		backLinkUrl: req.get('Referrer'),
		projectName: applicationResponse.data.ProjectName,
		caseRef: applicationResponse.data.CaseReference,
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		RepFrom: titleCase(representationResponse.data.RepFrom),
		PersonalName: representationResponse.data.PersonalName,
		RepresentationRedacted: representationResponse.data.RepresentationRedacted,
		DateRrepReceived: representationResponse.data.DateRrepReceived,
		attachments: representationResponse.data.attachments
	});
};
