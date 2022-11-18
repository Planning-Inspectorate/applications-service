const expectFormDataKeyValue = (form, key, value, index = 15) => {
	expect(form._streams[index]).toEqual(
		`--${form.getBoundary()}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n`
	);
	expect(form._streams[(index += 1)]).toEqual(value);
};

const expectFormDataFile = (form, fileName, file, index = 15) => {
	expect(form._streams[index]).toEqual(
		`--${form.getBoundary()}\r\n` +
			`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n` +
			'Content-Type: mock/mime-type\r\n\r\n'
	);
	expect(form._streams[(index += 1)].source.path).toEqual(file);
};
const expectFormDataToBeUndefined = (form, index = 0) => {
	expect(form._streams[index]).toBeUndefined();
};

module.exports = {
	expectFormDataKeyValue,
	expectFormDataFile,
	expectFormDataToBeUndefined
};
