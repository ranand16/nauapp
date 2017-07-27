var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool:'inline-source-map',
  entry:[
    'bootstrap-loader',
    './src'
  ],
  output:{
    path:path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve:{
    modules: ['node_modules','src'],
    extensions: ['*','.js']
  },
  module:{
    rules:[
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader:'babel-loader',
      options: {
        presets: ['es2015']
      }
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    },
    {
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader",
        options: {
          includePaths: [
            path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
          ]
        }
      }
      ]
    },
    {
        test: /\.(woff2?|ttf|eot|svg)$/,
        use:[
          {
            loader: 'url-loader?limit=10000'
          }
        ]
    },
    {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports-loader?jQuery=jquery'
    }
  ]},
  resolveLoader:{
    moduleExtensions: ["-loader"]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    hot: true,
    proxy: {
      '*':'http://localhost:3000'
    }
  }
};
