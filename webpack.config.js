const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, '/client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  // externals: {
  //   react: 'react'
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'Development',
    template: './client/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx*?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.sc*ss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  }
}