const compressionPlugin = require("compression-webpack-plugin");
const uglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  assetsDir: "assets",

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
          }),
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, "../static"),
              to: config.build.assetsSubDirectory,
              ignore: [".*"]
            }
          ])
        ]
      };
    }
  },

  publicPath: undefined,
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
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
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: "assets",
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
