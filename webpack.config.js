const path = require('path');

appConfig = {
  mode: 'production',
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
    /*alias: {
      'app': path.resolve(__dirname, 'src/app/ts/'),
      'admin': path.resolve(__dirname, 'src/admin/ts/'),
      'common': path.resolve(__dirname, 'src/common/ts/'),
      'login': path.resolve(__dirname, 'src/login/ts/')
    },*/
    modules: ['src/ts/', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'config': JSON.stringify(require('./config.json'))
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

module.exports = appConfig;