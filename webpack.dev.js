const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
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
                localIdentName: '[local]',
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
    watch: false
  });
};