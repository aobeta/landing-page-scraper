const scrape = require("website-scraper");
const dirSearch = require("directory-search");
const fs = require("fs");
const cheerio = require("cheerio");
const _ = require("lodash");

function HtmlManager() {
  return new Promise((resolve, reject) => {
    dirSearch("dist", ".html", function(err, files) {
      if (files.length !== 1)
        reject("There is more or less than one Html file");
      fs.readFile(files[0], "utf8", (error, data) => {
        resolve(data);
      });
    });
  }).then(removeTrackingScripts);
}

function removeTrackingScripts(html) {
  const $ = cheerio.load(html);
  console.log("script tags :", $("script"));
  $("script").remove();
  //   console.log($.html());
}

function cleanCss() {}

module.exports = HtmlManager;
