const scrape = require("website-scraper");
const fs = require("fs");

// url & path  expects a string
function scrapepage(url, path = "dist/") {
  try {
    fs.access(path, err => {
      if (err && err.code !== "ENOENT")
        throw new Error("directory already exists");
    });
    return new Promise((resolve, reject) => {
      const options = {
        urls: [url],
        urlFilter: function(arg) {
          return arg.indexOf(url) === 0;
        },
        directory: path,
        sources: [
          { selector: "img", attr: "src" },
          { selector: 'link[rel="stylesheet"]', attr: "href" },
          { selector: "script", attr: "src" },
        ],
        onResourceSaved: resource => {
          console.log(`Resource ${resource} was saved to ${path}`);
        },
        onResourceError: (resource, err) => {
          console.log(`Resource  was not saved because of ${err}`);
        },
        httpResponseHandler: response => {
          if (response.statusCode === 404) {
            return Promise.reject(new Error("status is 404"));
          } else {
            return Promise.resolve(response.body);
          }
        },
        filenameGenerator: "bySiteStructure",
      };
      scrape(options)
        .then(result => {
          console.log("scrapepage has finnised executing");
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
