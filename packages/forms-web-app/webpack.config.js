const path = require('path');
// const webpack = require('webpack');

// path.resolve(__dirname, 'src', 'lib', 'client-side', 'test.js')

// 1. Set multiple configs: https://medium.com/anuix/set-multiple-outputs-in-webpack-aa1e16da9b56
// 2. Add library: https://webpack.js.org/guides/author-libraries/
// 3. Add multiple libraries: https://github.com/webpack/webpack/tree/main/examples/multi-part-library
// 4. Do we really need 'devTool' in production? What are the pros/cons: https://webpack.js.org/configuration/devtool/
// 5. Setting up Babel for ES5 compiling: https://webpack.js.org/loaders/babel-loader/

/*
	What has this achieved.
	- Client side JS can now be written as modules
	- - This means we can use npm packages
	- - We can use are own modules
	- - These modules can be tested
	- Where ES6 modules were used before there will be optimisation as all imported files will be bundled into one file
	- There is optimisation by utilising and configuring the 'library' option so we only call the functions we need for that page
	- All files are now compiled for ES5 giving better browser support
*/

const outputPath = path.resolve(__dirname, 'src', 'public', 'javascripts');

const config = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};

const configMethods = {
	...config,
	entry: {
		test: './src/lib/client-side/test.js',
		test2: './src/lib/client-side/test-2.js',
		initScripts: './src/lib/client-side/init-scripts.js'
	},
	output: {
		filename: '[name].js',
		path: outputPath,
		library: ['yoyoApp', '[name]']
	}
};

const configRun = {
	...config,
	entry: {
		test3: './src/lib/client-side/test-3.js'
	},
	output: {
		filename: '[name].js',
		path: outputPath
	}
};

module.exports = [configMethods, configRun];

// module.exports = {
// 	mode: 'development',
// 	mode: 'production',
// 	entry: {
// 		test: './src/lib/client-side/test.js',
// 		test2: './src/lib/client-side/test-2.js',
// 	},
// 	output: {
// 		filename: '[name].js',
// 		path: path,
// 		library: ["yoyoyoyo", "[name]"],
// 	},
// 	plugins: [
// 		new webpack.DefinePlugin({
// 			'process.env.googleAnalyticsId': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
// 			'process.env.googleTagManager': process.env.FEATURE_FLAG_GOOGLE_TAG_MANAGER === 'true'
// 		})
// 	]
// }
