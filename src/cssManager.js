const fs = require('fs');
const cssConfig = require('../css.config.js');
const scrapeConfig = require('../scraper.config.js');
const cleanCSS = require('clean-css');
const copyScrapeConfig = Object.assign({}, scrapeConfig);
const copyCSSConfig = Object.assign({}, cssConfig);
const writeFile = require('write');
const read = require('read-file');

function optimizeCss() {
  let arrayOfPaths = [];
  let cssRules;
  // find all the css file  names.
  new Promise((resolve, reject) => {
    fs.readdir(`${copyScrapeConfig.directory}css/`, (err, files) => {
      files.forEach(file =>
        arrayOfPaths.push(`${copyScrapeConfig.directory}css/${file}`)
      );
      resolve(arrayOfPaths);
    });
  }).then(result => {
    result.forEach(path => {
      let buffer = read.sync(path);
      cssRules = buffer.toString();
      new cleanCSS(copyCSSConfig)
        .minify(cssRules)
        .then(output => {
          writeFile(path, output.styles);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });

  /* */
}

module.exports = optimizeCss;
