var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: false,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            minetype: 'application/font-woff',
          },
        }],
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }],
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['flow', 'es2015', 'stage-2', 'react'],
          plugins: ['react-hot-loader/babel']
        },
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader', options: { limit: 20000 } }]
      }
    ]
  },  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)      
    })
  ],
  node: {
    fs: 'empty'
  }
};

