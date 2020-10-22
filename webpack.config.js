const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./static/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./index.html", to: "./index.html" },
        { from: "./static/css/*", to: "./static/css/", flatten: true },
      ],
    }),
  ],
};
