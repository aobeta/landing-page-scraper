const scrape = require("website-scraper");
const dirSearch = require("directory-search");
const fs = require("fs");
const cheerio = require("cheerio");
const _ = require("lodash");
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");
const htmlBeautify = require("html-beautify");

function HtmlManager() {
  var htmlPath;
  return new Promise((resolve, reject) => {
    dirSearch("dist", ".html", function(err, files) {
      if (files.length !== 1)
        reject("There is more or less than one Html file");
      htmlPath = files[0];
      fs.readFile(files[0], "utf8", (error, data) => {
        resolve(data);
      });
    });
  })
    .then(processScripts)
    .then(cleanCss)
    .then(cleanHtml)
    .then(html => {
      return new Promise((resolve, reject) => {
        fs.writeFile(htmlPath, html, err => {
          if (err) {
            reject(err);
          } else {
            console.info("...Html Processing complete");
            resolve();
          }
        });
      });
    });
}

function processScripts(html) {
  var $ = cheerio.load(html);
  $("script").each(function(i, elem) {
    var scriptBody = $(this).text();
    if (hasTrackingScript(scriptBody)) {
      // remove entire script element
      $(this).remove();
    } else {
      let minifiedBody = minify(scriptBody);
      $(this).text(minifiedBody);
    }
  });
  return $;
}

function hasTrackingScript(body) {
  //  open to suggestions on how to improve this
  return (
    new RegExp("connect.facebook.net").test(body) ||
    new RegExp("https://www.google-analytics.com/analytics.js").test(body)
  );
}

function minify(body) {
  let result = UglifyJS.minify(body);
  if (result.error) {
    return body;
  } else {
    return result.code;
  }
}

function cleanCss($) {
  $("style").each(function(i, elem) {
    var styleBody = $(this).text();
    var outputCss = new CleanCSS().minify(styleBody);
    $(this).text(outputCss);
  });
  return $;
}

function cleanHtml($) {
  var html = $.html();
  return htmlBeautify(html);
}

module.exports = {
  HtmlManager,
  processScripts,
  hasTrackingScript,
  cleanCss,
  cleanHtml
};
