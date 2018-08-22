const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.tsx",
  output: {
    path: path.join(__dirname, "client", "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "client", "dist"),
    historyApiFallback: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:3000"
      }
    }
  },
  devtool: "eval-source-map"
};
