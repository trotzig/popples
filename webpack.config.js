module.exports = {
  entry: "./_popples.js",
  output: {
      path: __dirname + "/dist",
      filename: "popples.js"
  },
  resolve: {
    modulesDirectories: [
      __dirname + '/app'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'es6-loader'
      }
    ]
  }
};
