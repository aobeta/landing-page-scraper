const HtmlManager = require("./src/HtmlManager");
const scraper = require("./src/pagescraper");
const fs = require("fs");

// once we are finished this is how we make this library available to the outside world ( strawhouse devs )
// module.exports = scraper;

// just some random landing page I found
// HtmlManager("http://webdam.com/lp/how-to-select-a-dam_041516/");
scraper("https://www.scientificamerican.com/").then(() => {
  fs.readdir("dist/css", (err, files) => {
    files.forEach(file => console.log(file));
  });
});
