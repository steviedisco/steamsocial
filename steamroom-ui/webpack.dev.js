const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

const host = process.env.HOST || "localhost";

process.env.NODE_ENV = "development";

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    inline: false,
    contentBase: resolveAppPath("public"),
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
    historyApiFallback: true,
    host,
    port: 3000,
    publicPath: "/",
  },
});
