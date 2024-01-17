const addressToObj = (body) => {
	return {
		line1: body.line1,
		line2: body.line2,
		line3: body.line3,
		postcode: body.postcode,
		country: body.country
	};
};

module.exports = {
	addressToObj
};
