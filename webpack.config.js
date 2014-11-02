module.exports = {
    entry: "./_feed-the-blob.js",
    output: {
        path: __dirname + "/dist",
        filename: "feed-the-blob.js"
    },
    resolve: {
      modulesDirectories: [
        __dirname + '/app'
      ]
    }
};
