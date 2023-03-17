const fs = require('fs');
const { mapSessionToCommonFormData, markFormAsPersonalInfo } = require('./helpers');

const getListOfFormData = (session, item) => {
	let result = [];
	if (item.comment) {
		const form = mapSessionToCommonFormData(session, item);
		form.append('representation', item.comment);
		markFormAsPersonalInfo(form, item);
		result.push(form);
	}

	if (item.files) {
		for (const file of item.files) {
			const form = mapSessionToCommonFormData(session, item);
			markFormAsPersonalInfo(form, file);
			form.append('file', fs.createReadStream(file.uploadPath), {
				filename: file.fileName,
				contentType: file.raw.mimetype,
				knownLength: file.raw.size
			});
			result.push(form);
		}
	}

	return result;
};

module.exports = {
	getListOfFormData
};
