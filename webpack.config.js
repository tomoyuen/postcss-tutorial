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
	entry: ['webpack/hot/dev-server', APP_PATH],
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Hello world',
			css: [path.resolve(APP_PATH, 'css/index.css')],
			template: path.resolve(APP_PATH, 'index.html'),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		new Webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css?importLoaders=1&localIdentName=[local]!postcss',
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
	postcss: function (webpack) {
		return [
			postcssImport({
				addDependencyTo: webpack
			}),
			precss,
			autoprefixer
		]
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: false,
		hot: false,
		inline: true,
		progress: true,
		port: 3000
	},
	devtool: 'eval-source-map'
}
