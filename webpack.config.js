
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProd = env.production;
  
  return {
    module: {
      rules: [
        {
          test: /\.module\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 2
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css'
      })
    ]
  };
};
