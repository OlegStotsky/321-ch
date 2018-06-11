const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.tsx",
  output: {
    path: path.join(__dirname, "client", "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "client", "dist"),
    historyApiFallback: true
  }
};
