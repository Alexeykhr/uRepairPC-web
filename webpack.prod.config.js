'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader/lib/index')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  stats: {
    children: false
  },
  output: {
    filename: 'web/[name].[hash].js',
    chunkFilename: 'web/chunks/[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, process.env.WEBPACK_OUTPUT_DIR || 'dist')
  },
  devtool: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'web/images'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'web/files'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv,
    new VueLoaderPlugin,
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: ['web/*', 'index.html', 'sw.js']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      chunksSortMode: 'none',
      isDev: false
    }),
    new MiniCssExtractPlugin({
      filename: 'web/[name].[hash].css',
      chunkFilename: 'web/css/[name].[hash].css'
    }),
    new GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'web/pwa',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [
        // Output build
        /^\/web/, /sw\.js$/, /index\.html/,
        // Pages
        /^\/auth/, /^\/requests/, /^\/users/, /^\/equipments/, /^\/roles/, /^\/settings/
      ],
      runtimeCaching: [{
        urlPattern: /\.json$|api\/settings/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'settings'
        }
      }, {
        urlPattern: /storage/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'storage'
        }
      }, {
        // Disable cache images
        urlPattern: /api\/users\/images/,
        handler: 'NetworkOnly'
      }, {
        urlPattern: /api/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api'
        }
      }]
    }),
    // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'scss': path.resolve(__dirname, './src/styles/')
    }
  }
}