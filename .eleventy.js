const CleanCSS = require("clean-css");

module.exports = function (config) {
  config.addPassthroughCopy("src/images");
  config.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
