var Webpack = require('webpack'),
	path = require('path'),
	precss = require('precss'),
	autoprefixer = require('autoprefixer'),
	postcssImport = require('postcss-import'),
	HtmlwebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'app'),
	BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Hello world',
			css: [path.resolve(APP_PATH, 'css/index.css')],
			template: path.resolve(APP_PATH, 'index.html')
		}),
		new ExtractTextPlugin('app/index.css')
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract(['css?modules&importLoaders=1','postcss']),
			include: APP_PATH
		},{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=2048'
		},{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: ['transform-runtime']
			}
		}]
	},
	postcss: function () {
		return [
			postcssImport({
				addDependencyTo: Webpack
			}),
			precss,
			autoprefixer
		]
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 3000
	},
	devtool: 'eval-source-map'
}
