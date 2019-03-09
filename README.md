# Basic-React-Webpack
It's basic react project with Webpack.

## 基本配置

#### 需要下载的包或插件
```
wepback 
webpack-cli
webpack-dev-server

style-loader
css-loader

node-sass
sass-loader

clean-webpack-plugin
html-webpack-plugin

babel-loader
babel-core
babel-preset-env
babel-preset-react

react
react-dom
```

> npx babel-upgrade --write --install

#### package.json
```
{
  "name": "basic-react-webpack",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "dependencies": {},
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "clean-webpack-plugin": "^2.0.0",
    "css-loader": "^2.1.0",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.11.0",
    "react": "^16.8.4",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.2.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --progress --color",
    "start": "webpack-dev-server --progress --color --open"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
> Notes:<br/>
> &ensp;&ensp;"private": true <br/>
> &ensp;&ensp;"build": "webpack --progress --color"<br/>
> &ensp;&ensp;"start": "webpack-dev-server --progress --color --open"

#### .babelrc
&ensp;&ensp;最开始写的格式:
```
{
	"presets": ["env","react"]
}
```
&ensp;&ensp;npx babel-upgrade --write --install升级之后自动会变成:

```
{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react"
	]
}

```

#### .gitignore
&ensp;&ensp;git push origin master时忽略的文件
```
node_modules
dist
```

#### index.html
&ensp;&ensp;./src/index.html 之后html-webpack-plugin插件后会生成./dist/index.html
```
<!DOCTYPE html>
<html>
<head>
	<title>Todo List</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie-edge">
</head>
<body>
	<div id="root"></div>
</body>
</html>
```

#### webpack.config.js
```
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
		new CleanWebpackPlugin("./dist/*"),
		new HtmlWebpackPlugin({
			title: "basic-react-router-tutorial",
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks:'async',	//分割异步打包的代码
			cacheGroup: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
};
```

