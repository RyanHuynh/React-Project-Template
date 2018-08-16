const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = [{
  name: 'client',
  target: 'web',
  ...process.env.NODE_ENV !== 'production' ? { devtool: 'cheap-module-eval-source-map' } : {},
  mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? [new webpack.HotModuleReplacementPlugin()] : [
      new UglifyJsPlugin({ sourceMap: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ]),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Resolve',
      template: path.join(__dirname, 'src/index.ejs'),
    })],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: [
      'regenerator-runtime/runtime',
      'babel-polyfill',
      'element-closest',
      ...process.env.NODE_ENV !== 'production' ? [
        'eventsource-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.jsx',
      ] : [
        './src/indexProd.jsx',
      ],
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV !== 'production' ? '/' : '/resolve/js/', // virtual directory name where output will be served on devserver
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|xml|ico)$/,
      loader: 'url-loader',
    }],
  },
},

/* {
    name: 'server',
    target: 'node',
    entry: './src/server.jsx',
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    devtool: 'eval',
    resolve: {
      alias: {
        _src: path.resolve(__dirname, 'src/')
      }
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|json|xml|ico)$/,
          loader: 'url-loader'
        }]
    },
  },
*/
];

