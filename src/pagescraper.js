const scrape = require("website-scraper");
const fs = require("fs");
const scrapeConfig = require("../scraper.config.js");

// url & path  expects a string
function scrapepage(url, path = "dist/") {
  try {
    fs.access(path, err => {
      if (err && err.code !== "ENOENT")
        throw new Error("directory already exists");
    });
    return new Promise((resolve, reject) => {
      const options = Object.assign({}, scrapeConfig, {
        urls: [url],
        directory: path,
   
        urlFilter: function(arg) {
          return arg.indexOf(url) === 0;
        }
      });
      scrape(options)
        .then(result => {
          console.log("scrapepage has finished executing");
          resolve(result);
        })
        .catch(error => {
          console.log(error);
          reject(new Error("there was an error"));
        });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = scrapepage;
