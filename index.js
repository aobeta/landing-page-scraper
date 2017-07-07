const { HtmlManager } = require("./src/HtmlManager");
const scraper = require("./src/pageScraper");
const jsOptimizer = require("./src/jsOptimizer");
const cssOptimizer = require("./src/cssManager");

// once we are finished this is how we make this library available to the outside world ( strawhouse devs )
// module.exports = function(url, options) {
//   scraper(url, options)
//     .then(HtmlManager)
//     .then(/** css processor */)
//     .then(/** js processor */)
//     .then(/** image processor */);
// };

// just some random landing page I found
// HtmlManager("http://webdam.com/lp/how-to-select-a-dam_041516/");
scraper("https://www.scientificamerican.com/")
  .then(HtmlManager)
  .then(cssOptimizer)
  .then(jsOptimizer);
