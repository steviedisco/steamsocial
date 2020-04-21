const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = merge(common, {
  // Environment mode
  mode: "development",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    // clientLogLevel: "silent",
    inline: false,
    // Serve index.html as the base
    contentBase: resolveAppPath("public"),
    // Enable compression
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
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
    // Public path is root of content base
    publicPath: "/",
  },
});
