const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const ug = require('uglifyjs-webpack-plugin');

//commonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk。让我们使用这个件，将重复的代码比如loadash去除(已被移除，optimization是现在代码去重分离的方法)

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new ug({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('production')
		}),
		new webpack.HashedModuleIdsPlugin()
	],
	//代替commonsChunkPlugin防止重复，去重和分离chunk，动态导入需要注释掉
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks:'initial',
					minChunks: 2
				},
				vendor: {
					name: 'vendor',
					chunks: "initial",
					minChunks: 2
				},
				manifest: {
					name: 'manifest',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	}
})