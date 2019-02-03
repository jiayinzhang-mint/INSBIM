//gzip
const compressionPlugin = require("compression-webpack-plugin");
module.exports = {
  assetsDir: "./static",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      };
    }
  }
};
