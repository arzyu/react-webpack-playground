import { resolve } from "path";

import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const devMode = process.env.NODE_ENV !== "production";

const root = resolve(process.cwd());
const dist = resolve(root, "dist");

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  context: resolve(root, "src"),
  entry: {
    index: "./index"
  },
  output: {
    filename: devMode ? "[name].js" : "[name].[contenthash:7].js",
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.ejs"
    })
  ],
  devServer: {
    contentBase: dist,
    host: "0.0.0.0",
    hot: true
  }
};

export default config;
