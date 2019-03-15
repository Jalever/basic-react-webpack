const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.jsx"
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test:/\.scss$/,
				use:["style-loader","css-loader","sass-loader"]
			},{
				test:/\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "basic-react-router-tutorial",
			template: "./src/index.html",
			filename: "./index.html"
		}),
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.HashedModuleIdsPlugin()	//so that file hashes don't change unexpectedly
	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `npm.${packageName.replace("@","")}`;
					}
				}

			}
		}
	}
};