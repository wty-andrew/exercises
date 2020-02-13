const path = require('path')

module.exports = {
  entry: {
    utils: './src/utils.js',
    vector: './src/vector.js',
    particle: './src/particle.js',
    arm: './src/arm.js',
    fksystem: './src/fksystem.js',
    index: './src/index.js',
  },
  output: {
    path: __dirname,
    filename: './[name].js'
  },

  // module: {
  //   rules: [{
  //     test: /\.js?$/,
  //     exclude: /(node_modules)/,
  //     loader: 'babel-loader'
  //   }]
  // },

  devServer: {
    contentBase: path.join(__dirname, './src'),
    compress: true,
    port: 3000,
  }
}
