/**
 * OS Maps style URLs
 * @type {Record<string, string>}
 */
export const MAP_STYLES = {
	Road: 'https://api.os.uk/maps/raster/v1/zxy/Road_27700/{z}/{x}/{y}.png',
	Outdoor: 'https://api.os.uk/maps/raster/v1/zxy/Outdoor_27700/{z}/{x}/{y}.png',
	Light: 'https://api.os.uk/maps/raster/v1/zxy/Light_27700/{z}/{x}/{y}.png',
	Leisure: 'https://api.os.uk/maps/raster/v1/zxy/Leisure_27700/{z}/{x}/{y}.png'
};

/**
 * Map configuration constants for OS Maps integration
 */
export const MAP_CONFIG = {
	DEFAULT_LAT: 52.3,
	DEFAULT_LNG: -1.7,
	DEFAULT_ZOOM: 0,
	DEFAULT_STYLE: 'Road',
	RESOLUTIONS: [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75],
	BOUNDS: {
		MIN_LAT: 49,
		MAX_LAT: 62,
		MIN_LNG: -11,
		MAX_LNG: 3
	},
	MAX_BOUNDS: [
		[49.56, -10.0],
		[62.0, 6.0]
	],
	CRS_PROJ:
		'+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
	ORIGIN: [-238375.0, 1376256.0]
};
