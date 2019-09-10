const webpack = require('webpack');
const path = require('path');

module.exports = env => {
  return {
    target: 'web',
    devtool: 'source-map',
    module: {
      rules: [{
          test: /\.tsx?$/,
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
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'config': JSON.stringify(env),
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