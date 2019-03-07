const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: {
		app: "./src/index.jsx"
	},
	output: {
		filename: "[name].[hash].js",
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
		new HtmlWebpackPlugin({
			title: "basic-react-router-tutorial",
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};