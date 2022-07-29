const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { formatDate } = require('../../utils/date-utils');
const { searchRepresentations } = require('../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { getRepresentation } = require('../../services/representation.service');

exports.getRepresentations = async (req, res) => {
	const { searchTerm, type } = req.query;
	const applicationResponse = await getAppData(req.params.case_ref);
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

	if (applicationResponse.resp_code === 200) {
		const representationsResponse = await searchRepresentations(params);
		const respData = representationsResponse.data;
		const { representations, filters } = respData;
		const paginationData = getPaginationData(respData);
		const pageOptions = calculatePageOptions(paginationData);
		const { typeFilters } = filters;

		typeFilters.forEach(function (typeFilter) {
			commentsTypeFilterItems.push({
				text: `${typeFilter.name} (${typeFilter.count})`,
				value: typeFilter.name,
				checked: type && type.includes(typeFilter.name)
			});
		}, Object.create(null));

		representations.forEach(function (repesentation) {
			repesentation.DateRrepReceived = formatDate(repesentation.DateRrepReceived.split('T')[0]);
		}, Object.create(null));

		res.render(VIEW.PROJECTS.REPRESENTATIONS, {
			projectName: applicationResponse.data.ProjectName,
			caseRef: applicationResponse.data.CaseReference,
			hideProjectInformationLink: true,
			representations,
			paginationData,
			pageOptions,
			searchTerm,
			queryUrl,
			commentsTypeFilterItems
		});
	}
};

exports.getRepresentation = async (req, res) => {
	const applicationResponse = await getAppData(req.params.case_ref);
	if (applicationResponse.resp_code === 200) {
		const representation = await getRepresentation(req.params.id);

		res.render(VIEW.PROJECTS.REPRESENTATION, {
			projectName: applicationResponse.data.ProjectName,
			caseRef: applicationResponse.data.CaseReference,
			hideProjectInformationLink: true,
			RepFrom: representation.data.RepFrom,
			RepresentationRedacted: representation.data.RepresentationRedacted,
			DateRrepReceived: representation.data.DateRrepReceived,
			attachments: representation.data.attachments
		});
	}
};
