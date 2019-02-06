const compressionPlugin = require("compression-webpack-plugin");
const uglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  assetsDir: "./static",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new uglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          }),
          new compressionPlugin({
            test: /\.js$|\.html$|\.css/,
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          })
        ]
      };
    }
  }
};

//proxy
module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:3000",
        ws: false
      }
    }
  }
};
