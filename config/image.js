const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = (eleventyConfig) => {
  function relativeToInputPath(inputPath, relativeFilePath) {
    let split = inputPath.split("/");
    split.pop();

    return path.resolve(split.join(path.sep), relativeFilePath);
  }

  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    "image",
    async function imageShortcode(src, className, alt, widths, sizes, srcset) {
      let formats = ["avif", "webp", "auto"];
      let file = relativeToInputPath(this.page.inputPath, src);
      let metadata = await eleventyImage(file, {
        widths: widths || ["auto"],
        formats,
        srcset,
        outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
      });

      let imageAttributes = {
        class: className,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };
      return eleventyImage.generateHTML(metadata, imageAttributes);
    }
  );
};
