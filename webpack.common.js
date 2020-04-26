const path = require('path');
//如果我们更改了一个入口的起点名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html问价仍然会引用旧的名字，这时候我们需要
//HtmlWebpackPlugin来解决这个问题
const HtmlWebpackPlugin = require('html-webpack-plugin');

//在每次构建钱清理/dist文件夹，是比较推荐的做法，因此在生成文件的视乎，我们需要完成这个需求，clean-webpack-plugin是一个比较普遍的管理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');
//三种常用的代码分离方法:
/**
 * 1: 入口起点: 使用entry配置手动地分离代码
 * 2: 放置重复: 使用commonschunkplugin去重和分离chunk
 * 3：动态导入: 通过模块的内联函数调用来分离代码
 */

module.exports = {
	entry: {
		/**缓存：将第三方库(library)(例如loadash或react)提取到单独的vendor chunk文件中，是比较推荐的做法。因为他们很少像本地的源代码那样频繁修改。
		 * 因此通过实现manifest机制，利用客户端的长效缓存机制，可以通过缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致
		 * 这可以通过使用新的entry(入口)起点，以及在配置一个commonsChunPlugin(已被optimization取代)组合方式来实现
		*/
		main: './src/index.js',
		vendor: [
			'lodash'
		]
		//动态注入
		//app: './src/dynamic-imports-index.js',
		//入口起点分离,动态导入需注释
		// app: './src/index.js',
		// another: './src/another-module.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Production'
		}),
		//shimming: 1:创建一些全局变量
		new webpack.ProvidePlugin({
			_: "lodash",
			join: ['lodash','join']
		})
	],
	output: {
		filename: '[name].[chunkhash].js',
		//动态导入
	//	chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			//通过imports-loader可以复写this值
			{
				test: require.resolve('./src/index.js'),
				use: 'imports-loader?this=>window'
			},
			//js es6转换成es5
			{
				test: /\.js|jsx$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				],
				exclude: /node_modules/
			},
			//样式处理
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			//图片处理
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			//字体处理
			{
				test: /\.(woff|woff2|eot|ttf|otf|ttc)$/,
				use: [
					'file-loader'
				]
			},
			//加载数据管理
			{
				test: /\.(csx|tsv)$/,
				use: [
					'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			}
		]
	},
}