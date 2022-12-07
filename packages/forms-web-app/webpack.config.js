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
		sanitiseForm: `${entryPath}/sanitise-form.js`,
		stepByStep: `${entryPath}/step-by-step.js`
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
		checkboxAccordion: `${entryPath}/checkbox-accordion`,
		index: `${entryPath}/index.js`,
		cookiePreferences: `${entryPath}/cookie-preferences-page.js`
	},
	output: {
		filename: `[name].${outputFilenamePrefix}.js`,
		path: outputPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.googleAnalyticsId': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
			'process.env.googleTagManager': process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true'
		})
	]
};

module.exports = [configAppScripts, configPageScripts];
