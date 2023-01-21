const fileSizeDisplayHelper = require('../../../../../lib/file-size-display-helper');
const fileTypeDisplayHelper = require('../../../../../lib/file-type-display-helper');

const getExaminationLibraryDocumentHtml = (document) =>
	document
		? `<p><a href="${document.path}">View examination library (${fileTypeDisplayHelper(
				document.mime
		  )}, ${fileSizeDisplayHelper(document.size)})</a> containing document reference numbers</p>`
		: null;

module.exports = { getExaminationLibraryDocumentHtml };
