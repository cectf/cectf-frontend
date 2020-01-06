const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                localIdentName: '[sha1:hash:base64:8]',
                importLoaders: true,
                namedExport: true,
                camelCase: true,
                sourceMap: true
              }
            },
            'sass-loader?sourceMap'
          ]
        }
      ]
    },
  });
};