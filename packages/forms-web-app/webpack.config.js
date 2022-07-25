const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const outputPath = path.resolve(__dirname, 'src', 'public', 'javascripts');

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
		sanitiseForm: './src/lib/client-side/sanitise-form.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: outputPath,
		library: ['appScripts', '[name]']
	}
};

const configPageScripts = {
	...config,
	entry: {
		index: './src/lib/client-side/index.js',
		cookiePreferences: './src/lib/client-side/cookie-preferences-page.js'
	},
	output: {
		filename: '[name].bundle.js',
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
