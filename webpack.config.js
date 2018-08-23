const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const outputDirectory = "dist";
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: '/public/',
  },
  watch: true,
  resolve: { extensions: [".js"] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
      test: /\.svg$/,
      loaders: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          query: {
            jsx: true
          }
        },
      ]
    },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    // publicPath: '/',
    // index: 'index.html',
    contentBase: `${__dirname}\\dist\\public`,
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080"
    },
    // writeToDisk: true,
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      filename: "./public/index.html",
      // template: "./public/index.html",
      favicon: "./public/favicon.ico",
      template: "./views/base.ejs",
    })
  ]
};
