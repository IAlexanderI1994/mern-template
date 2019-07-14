const path                 = require('path')
const webpack              = require('webpack')
const HTMLWebpackPlugin    = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin         = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  entry: {
    main: './client/src/main.js'
  },
  mode: 'production',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '../client', 'build'),
    publicPath: '/',

  },
  target: 'web',
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  devServer: {
    contentBase: 'build',
    overlay: true,
    hot: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    },
    port: 8082,
    historyApiFallback: true,

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [

          {
            loader: 'html-loader',
          },

        ]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'app.[hash].css',
      chunkFilename: '[id].css'
    }),

  ]
}