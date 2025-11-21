const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const entryPath = path.resolve(__dirname, 'src', 'scripts');
const outputPath = path.resolve(__dirname, 'src', 'public');
const outputFilenamePrefix = 'script';

const config = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		]
	}
};

const configAppScripts = {
	...config,
	entry: {
		initiate: `${entryPath}/initiate.js`,
		map: `${entryPath}/map`,
		leaflet: `${entryPath}/leaflet`,
		modal: `${entryPath}/modal`,
		simulateUserAction: `${entryPath}/simulate-user-action.js`
	},
	output: {
		filename: `[name].${outputFilenamePrefix}.js`,
		path: `${outputPath}/scripts`,
		library: ['appScripts', '[name]']
	}
};

const configPageScripts = {
	...config,
	entry: {
		'checkbox-accordion': `${entryPath}/checkbox-accordion`,
		index: `${entryPath}/index.js`,
		'cookie-preferences': `${entryPath}/cookie-preferences-page.js`,
		'step-by-step-navigation': `${entryPath}/step-by-step-navigation.js`,
		'service-worker': `${entryPath}/service-worker/index.js`,
		'register-service-worker': `${entryPath}/service-worker/register-service-worker.js`,
		'unregister-service-worker': `${entryPath}/service-worker/unregister-service-worker.js`
	},
	output: {
		filename: `[name].${outputFilenamePrefix}.js`,
		path: `${outputPath}/scripts`
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.googleTagManager': process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true'
		})
	]
};

//TODO finish off
const configExternalCss = {
	...config,
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../../node_modules/leaflet/dist/leaflet.css'),
					to: path.resolve(__dirname, `${outputPath}/stylesheets/leaflet.css`)
				},
				{
					from: '../../node_modules/leaflet/dist/images',
					to: `${outputPath}/images/leaflet`
				}
			]
		})
	]
};

module.exports = [configAppScripts, configPageScripts];
