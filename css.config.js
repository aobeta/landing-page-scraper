const scrapeConfig = require('./scraper.config.js');

module.exports = {
  level: 2,
  format: 'beautify', // formats output in a really nice way
  returnPromise: true,
  inline: ['none'], // disables all inlining
};
