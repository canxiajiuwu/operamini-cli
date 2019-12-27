'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件

var chunks = Object.keys(entries);

function resolve (dir) {
  return path.join(__dirname, dir)
}



const env = config.build[process.env.env_config+'Env'];


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry:  entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? env.STATICURL.replace(/\"/g,'')+config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src'), resolve('test')]
      // },
      {
          test: /\.pug$/,
          loader: ['html-loader','pug-html-loader']
      },
      {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: [
                      [
                          "@babel/preset-env",
                          {
                              "useBuiltIns": 'usage',
                              "targets": {
                                  "chrome": "58",
                                  "ie": "11"
                              }
                          }
                      ]
                  ]
              }
          },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test:/\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //       use:[
      //           {loader:"css-loader"},
      //           {loader:"postcss-loader"},
      //       ]
      //   })
      //
      // },
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use:[
      //         {loader:"css-loader"},
      //         {loader:"postcss-loader"},
      //         {loader:"less-loader"},
      //     ]
      //   })
      // },
        {
            test: /\.(le|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // hmr: process.env.NODE_ENV === 'development',
                        publicPath:env ? env.imgUrl.replace(/\"/g,'') : '../../../../',
                        alias:{
                            '@assets':path.join(__dirname,'..','src/assets')
                        }
                    },
                },
                'css-loader',
                'postcss-loader',
                'less-loader',
            ],
        },
    ]
  },
  plugins:[
    // extract css into its own file
    new MiniCssExtractPlugin({
        chunkFilename: utils.assetsPath("css/views/common/[id].css"),
        filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
  ],
  externals: {

  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
