const cssManage = require('../src/cssManager');
const fs = require('fs');
const cssConfig = require('../css.config.js');
const scrapeConfig = require('../scraper.config.js');
const cleanCSS = require('clean-css');
const copyScrapeConfig = Object.assign({}, scrapeConfig);
const copyCSSConfig = Object.assign({}, cssConfig);
const writeFile = require('write');
const read = require('read-file');
const htmlManage = require('../src/HtmlManager');
const pageScrape = require('../src/pagescraper');

//to-do write tests.
