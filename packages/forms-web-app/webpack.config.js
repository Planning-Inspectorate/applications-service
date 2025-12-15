const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const entryPath = path.resolve(__dirname, 'src', 'scripts');
const outputPath = path.resolve(__dirname, 'src', 'public', 'scripts');
const publicPath = path.resolve(__dirname, 'src', 'public');
const nodeModulesPath = path.resolve(__dirname, '..', '..', 'node_modules');
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
		leaflet: `${entryPath}/leaflet`,
		map: `${entryPath}/map`,
		modal: `${entryPath}/modal`,
		simulateUserAction: `${entryPath}/simulate-user-action.js`
	},
	output: {
		filename: `[name].${outputFilenamePrefix}.js`,
		path: outputPath,
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
		path: outputPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.googleTagManager': process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(nodeModulesPath, 'leaflet', 'dist', 'leaflet.css'),
					to: path.resolve(publicPath, 'stylesheets', 'leaflet.css')
				},
				{
					from: path.resolve(nodeModulesPath, 'leaflet', 'dist', 'images'),
					to: path.resolve(publicPath, 'images', 'leaflet')
				}
			]
		})
	]
};

module.exports = [configAppScripts, configPageScripts];
