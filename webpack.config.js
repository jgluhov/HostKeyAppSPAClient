/**
 * Created by jgluhov on 09/02/16.
 */

var webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
	koutoSwiss = require('kouto-swiss');

module.exports = {
	context: __dirname + '/src',
	entry: {
		vendor: [
			'jquery',
			'angular',
			'angular-ui-router',
			'rxjs',
			'rx-dom',
			'events'
		],
		app: './scripts/app.js'
	},

	output: {
		path: __dirname + 'public',
		publicPath: '/',
		filename: 'js/bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel?presets[]=es2015', 'eslint']
			},
			{
				test: /\.jade$/,
				exclude: /node_modules/,
				loader: 'jade'
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				loader: ExtractTextWebpackPlugin.extract('style', 'css!stylus')
			},
			{
				test: /\.css$/,
				loader: ExtractTextWebpackPlugin.extract('style', 'css')
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg|map)$/,
				loader: 'file?name=./fonts/[name].[ext]'
			}
		]
	},
	noParse: [
		/jquery\/dist\/jquery.js/,
		/angular\/angular.js/,
		/angular-ui-router\/release\/angular-ui-router.js/
	],
	plugins: [
		new HtmlWebpackPlugin({
			template: './templates/index.jade'
		}),
		new ExtractTextWebpackPlugin('./css/styles.css', {
			disable: process.env.NODE_ENV === 'development'
		}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.bundle.js")
	],
	stylus: {
		use: [koutoSwiss()],
		import: ['~kouto-swiss/index.styl']
	}
};