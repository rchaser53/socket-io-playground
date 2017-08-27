const path = require("path");

const webpack = require('webpack');
const nodeRoot = path.join( __dirname, 'node_modules' )

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  entry: {
    "modal": "./index.js",
    "sendMessage": "./sendMessage.js",
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    publicPath: "/public/",
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ['.html', '.js']
  },
  module: {
    rules:[{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude:["node_modules/*"]
    }],
    noParse: [
      /socket.io-client/
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      'socket.io-client': path.join( nodeRoot, 'socket.io-client', 'dist', 'socket.io.js' )
    }
  },
  node: {
    fs: 'empty'
  }
};