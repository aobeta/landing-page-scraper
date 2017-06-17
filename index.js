const HtmlManager = require("./src/HtmlManager");

// once we are finished this is how we make this library available to the outside world ( strawhouse devs )
// module.exports = function(url, options) {
//   HtmlManager(url, options);
// };

// just some random landing page I found
HtmlManager("http://webdam.com/lp/how-to-select-a-dam_041516/");
