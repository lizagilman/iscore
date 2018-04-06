var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

var ROOT_PATH = path.resolve(__dirname, "static");
module.exports = {
  context: __dirname,

  entry: path.resolve(ROOT_PATH, "src/index"),

  output: {
    path: path.join(ROOT_PATH, "bundles"),
    filename: "bundle.js"
  },

  //mode: 'development',

  plugins: [new BundleTracker({ filename: "./webpack-stats.json" })],

  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "es2016", "stage-0", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png|gif)(\?.*$|$)/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["eslint-loader"]
      }
    ]
  }
};
