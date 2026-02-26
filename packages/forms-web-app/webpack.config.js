const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const entryPath = path.resolve(__dirname, 'src', 'scripts');
const outputPath = path.resolve(__dirname, 'src', 'public', 'scripts');
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
		modal: `${entryPath}/modal`,
		'projects-map': `${entryPath}/projects-map`,
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
		})
	]
};

module.exports = [configAppScripts, configPageScripts];
