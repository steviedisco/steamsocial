const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  // Environment mode
  mode: "development",
  entry: "./src/bootstrap.tsx",
  output: {
    filename: "./public/bundle.js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // Handle .ts and .tsx file via ts-loader.
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
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
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath("public/index.html"),
    }),
  ],
};
