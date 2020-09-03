module.exports = {
  "modules": false,
  "map": process.env.NODE_ENV === 'production' ? false : true,
  plugins: [
    require('autoprefixer'),
  ],
};