const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "xuni",
    filename: "bundle.js",
  },
  devServer: {
    port: 8080,
    contentBase: "www",
  },
};
