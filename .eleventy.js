const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function (config) {
  config.addPassthroughCopy("images");
  config.addPassthroughCopy("styles");
  config.addPlugin(PostCSSPlugin);
};
