const path = require("path");

module.exports = {
  entry: "./dist/javascript/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./dist/",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: ["file-loader"],
      },
    ],
  },
  mode: "none",
};
