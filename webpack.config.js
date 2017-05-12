const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/[name].js`,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {test: /\.(jpg|jpeg|gif|png|ico)(\?.*$|$)$/,
            loader: 'file-loader?name=img/[name].[ext]'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
    watch:true
}

