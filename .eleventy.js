const PostCSSPlugin = require("eleventy-plugin-postcss");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginImages = require("./config/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
