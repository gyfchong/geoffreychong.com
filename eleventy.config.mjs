import PostCSSPlugin from "eleventy-plugin-postcss";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginImages from "./config/image.mjs";

export default function (eleventyConfig) {
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
}
