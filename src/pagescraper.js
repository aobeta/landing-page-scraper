const scrape = require("website-scraper");
const fs = require("fs");
const scrapeConfig = require("../scraper.config.js");
const optimizeCSS = require("./cssManager.js");

// url  expects a string
function scrapepage(url) {
  return new Promise((resolve, reject) => {
    const options = Object.assign({}, scrapeConfig, {
      urls: [url],
      urlFilter: function(arg) {
        return arg.indexOf(url) === 0;
      },
    });
    fs.access(options.directory, err => {
      if (err && err.code !== "ENOENT")
        return Promise.reject("directory already exists");
    });
    scrape(options)
      .then(result => {
        console.log("scrapepage has finnished executing");
        console.log("running css optimizations");
        optimizeCSS();
        console.log("----------done-----------");
        resolve(result);
      })
      .catch(error => {
        console.log(error);
        reject(new Error("there was an error"));
      });
  });
}

module.exports = scrapepage;
