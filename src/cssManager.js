const fs = require("fs");
const cssConfig = require("../css.config.js");
const scrapeConfig = require("../scraper.config.js");
const cleanCSS = require("clean-css");
const copyScrapeConfig = Object.assign({}, scrapeConfig);
const copyCSSConfig = Object.assign({}, cssConfig);
const writeFile = require("write");

//

function optimizeCSS() {
  let arrayOfPaths = [];
  // find all the css file  names.
  fs.readdir(`${copyScrapeConfig.directory}css/`, (err, files) => {
    files.forEach(file =>
      arrayOfPaths.push(`${copyScrapeConfig.directory}css/${file}`)
    );
  });
  setTimeout(() => {
    new cleanCSS(copyCSSConfig)
      .minify(arrayOfPaths)
      .then(output => {
        writeFile(`${copyScrapeConfig.directory}css/min.css`, output.styles);
      })
      .catch(error => {
        console.log(error);
      });
  }, 20000);

  /* */
}

module.exports = optimizeCSS;
