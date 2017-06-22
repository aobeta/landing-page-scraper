const HtmlManager = require("./src/HtmlManager");
const scraper = require("./src/pagescraper");

// once we are finished this is how we make this library available to the outside world ( strawhouse devs )
// module.exports = scraper;

// just some random landing page I found
// HtmlManager("http://webdam.com/lp/how-to-select-a-dam_041516/");
scraper("http://webdam.com/lp/how-to-select-a-dam_041516/").catch(err => {
  console.log("hello");
});
