const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    '{{projectName}}': './src/index.js',
    '{{projectName}}.min': './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: '{{libName}}',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
}
