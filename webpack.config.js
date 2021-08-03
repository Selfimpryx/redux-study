const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  devtool:'source-map',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename: 'index.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env'],
            plugins:['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins:[
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    contentBase:path.join(__dirname,'dist'),
    hot:true,
    port:'8000'
  }
}