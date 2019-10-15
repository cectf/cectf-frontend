const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return {
    target: 'web',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: path.resolve(__dirname, 'node_modules'),
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },
    resolve: {
      modules: ['src/ts/', 'node_modules'],
      extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
      alias: {
        '@cectf': path.resolve(__dirname, 'src/ts/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
      }
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    stats: {
      errorDetails: true
    },
    entry: path.resolve(__dirname, 'src/ts/index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};