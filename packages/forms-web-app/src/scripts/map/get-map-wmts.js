const getMapWMTS = async (accessToken) => {
	const response = await fetch(
		'https://api.os.uk/maps/raster/v1/wmts?request=GetCapabilities&service=WMTS',
		{
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		}
	);

	return await response.text();
};

module.exports = { getMapWMTS };
