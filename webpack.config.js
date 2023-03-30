// third-party libraries
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyFiles = require("copy-webpack-plugin");

// Check environment
const prod = process.env.NODE_ENV === "production";

// configuration
module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  devServer: { historyApiFallback: true },
  mode: prod ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
        include: path.join(__dirname, "assets"),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    filename: "[name].[contenthash:8].min.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "index.html",
    }),
    new CopyFiles({
      patterns: [{ from: "./assets", to: "assets" }],
    }),
  ],
};
