const path = require('path');
//如果我们更改了一个入口的起点名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html问价仍然会引用旧的名字，这时候我们需要
//HtmlWebpackPlugin来解决这个问题
const HtmlWebpackPlugin = require('html-webpack-plugin');

//在每次构建钱清理/dist文件夹，是比较推荐的做法，因此在生成文件的视乎，我们需要完成这个需求，clean-webpack-plugin是一个比较普遍的管理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//你可能会感兴趣，webpack及其插件似乎知道应该哪些文件生成。答案是，通过manifest，webpack能够对[你的模块映射到输出bundle的过程]保持追踪。

//模块热替换(HMR)是webpack提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
const webpack = require('webpack');

module.exports = {
	//HRM
	entry: {
		app: './src/index.js'
	},
	//多文件引用
	// entry: {
	// 	app: './src/index.js',
	// 	print: './src/js/print.js'
	// },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	// entry: './src/index.js',
	// output: {
	// 	filename: 'bundle.js',
	// 	path: path.resolve(__dirname, 'dist')
	// },
	//为了更容易地追踪错误和警告，JavaScript提供了source map功能，将编译后的代码映射回原始源代码。如果一个错误来自b.js，source map就会明确的告诉你
	devtool: 'inline-source-map',
	//webpack-dev-server 为你提供了一个简单的web服务器，并且能够实时重新加载，下面就是告诉服务器在那里查找文件,这个配置告知webpack-dev-server，在localhost:8080下建立服务
	//将dist目录下的文件，作为可访问文件。我们可在package.json添加一个script脚本，可直接运行开发服务器
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules: [
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
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '云流烟学习webpack之旅途'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	mode: "production"
}