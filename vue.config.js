const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
//proxy
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //terser
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const terserOptions = terserWebpackPlugin.options.terserOptions;
      terserOptions.compress["drop_console"] = true;
      //gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:3000",
        ws: false
      }
    }
  },
  publicPath: undefined,
  outputDir: "INSBIM",
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
