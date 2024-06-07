const fileSizeDisplayHelper = require('../../../../../lib/file-size-display-helper');
const fileTypeDisplayHelper = require('../../../../../lib/file-type-display-helper');

const getExaminationLibraryDocumentHtml = (i18n, document) =>
	document
		? i18n.t('projectsDocuments.paragraph1', {
				link: `<a class="govuk-link" href="${document.path}">${i18n.t(
					'projectsDocuments.paragraph1LinkText'
				)} (${fileTypeDisplayHelper(document.mime)}, ${fileSizeDisplayHelper(document.size)})</a>`
		  })
		: null;

module.exports = { getExaminationLibraryDocumentHtml };
