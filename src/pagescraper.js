const _ = require("lodash");
const scrape = require("website-scraper");

function scrapepage(url, path) {
  return new Promise((resolve, reject) => {
    const DefaultOptions = {
      directory: "tmp/",
    };
    // apply default options incase there
    const options = {
      urls: [url],
      urlFilter: function(arg) {
        return arg.indexOf(url) === 0;
      },
      directory: path || DefaultOptions.directory,
      sources: [
        { selector: "img", attr: "src" },
        { selector: 'link[rel="stylesheet"]', attr: "href" },
        { selector: "script", attr: "src" },
      ],
      onResourceSaved: resource => {
        console.log(`Resource ${resource} was saved to fs`);
      },
      onResourceError: (resource, err) => {
        console.log(`Resource ${resource} was not saved because of ${err}`);
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
        console.log("Done downloading page and page assets");
        resolve(result);
      })
      .catch(error => {
        reject("there was an error");
        console.log(error);
      });
  });
}

module.exports = scrapepage;
