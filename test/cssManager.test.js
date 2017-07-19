const scrapeConfig = require('../scraper.config.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(scrapeConfig.directory));

const server = app.listen(port, function() {
  console.log(`server running on ${port}`);
});

// how you close the file
// server.close();
