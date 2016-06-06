var path = require('path'),
	precss = require('precss'),
	autoprefixer = require('autoprefixer'),
	postcssImport = require('postcss-import'),
	HtmlwebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'app'),
	BUILD_PATH = path.resolve(ROOT_PATH, 'build'),
	PROD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
	entry: [APP_PATH],
	output: {
		path: PROD_PATH,
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Hello world',
			css: [path.resolve(APP_PATH, 'css/index.css')],
			template: path.resolve(APP_PATH, 'index.html'),
			minify: {
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		new ExtractTextPlugin('css/style.[hash:8].css')
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style','css?module&localIdentName=[local]&importLoaders=1!postcss'),
			include: APP_PATH
		},{
			test: /\.(png|jpg|jpeg|gif)$/,
			loader: 'url-loader?limit=2048'
		},{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: ['transform-runtime']
			}
		},{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url?limit=10000&minetype=application/font-woff"
		},
		{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file"
		}]
	},
	postcss: function (bundler) {
		return [
			postcssImport({
				addDependencyTo: bundler
			}),
			precss,
			autoprefixer
		]
	},
	devtool: 'eval-source-map'
}
