const _ = require("lodash");
const scrape = require("website-scraper");

function HtmlManager(url, options) {
  return new Promise((resolve, reject) => {
    var default_options = {
      directory: "dist/"
    };
    // apply default options incase there are no specified options
    options = options ? options : {};
    _.defaults(options, default_options);

    // specify url
    options.urls = [url];

    scrape(options)
      .then(result => {
        console.log("Landing Page scraped");
        console.log(
          `scraped files can be found in the ${options.directory} folder`
        );
        resolve(true);
      })
      .catch(error => {
        reject("there was an error scraping the page");
        console.log("there was an error with the scraping operation : ", error);
      });
  });
}

module.exports = HtmlManager;
