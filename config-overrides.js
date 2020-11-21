const webpack = require("webpack");
const { useBabelRc, override, addWebpackPlugin } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
  )
);
