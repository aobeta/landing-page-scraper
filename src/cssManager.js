const fs = require("fs");

// find all the css files.
fs.readdir("dist/css", (err, files) => {
  files.forEach(file => console.log(file));
});
